import {
  Wechaty,
  WechatyPlugin,
  log,
  Message,
}                   from 'wechaty'
import { matchers } from 'wechaty-plugin-contrib'

import { normalizeConfig }  from './normalize-config'
import { atMatcher }        from './at-matcher'
import {
  WeixinOpenAI,
  ANSWER_STATUS,
  AIBotRequestResponse,
  SentimentData,
}                           from './openai'

const DEFAULT_MIN_SCORE = 70
const PRE = 'WechatyWeixinOpenAI'

export interface WechatyWeixinOpenAIConfig {
  /**
   * Effective scope related arguments
   */
  contact?         : matchers.ContactMatcherOptions,
  room?            : matchers.RoomMatcherOptions,
  mention?         : boolean,
  language?        : matchers.LanguageMatcherOptions,
  skipMessage?     : matchers.MessageMatcherOptions,

  /**
   * Authentication related arguments
   */
  token?           : string,
  encodingAESKey?  : string,

  /**
   * Chatbot related arguments. Not implemented yet.
   * TODO: implement the argument logic below
   */
  includeNlpResult?: boolean,
  minScore?        : number,
  includeSentiment?: boolean,

  /**
   * Hook functions below allows you to interfere with the conversation with your own logic
   */
  noAnswerHook?    : (message: Message) => Promise<void>,
  preAnswerHook?   : (message: Message, answer: AIBotRequestResponse, sentiment?: SentimentData) => Promise<boolean | void>,
}

function WechatyWeixinOpenAI (config: WechatyWeixinOpenAIConfig): WechatyPlugin {
  log.verbose(PRE, 'WechatyWeixinOpenAI()')

  const { token, encodingAESKey } = normalizeConfig(config)

  const minScore = config.minScore ?? DEFAULT_MIN_SCORE
  log.verbose(PRE, `minScore: ${minScore}`)
  const { noAnswerHook } = config

  WeixinOpenAI.init(token, encodingAESKey)

  const matchContact = typeof config.contact === 'undefined'
    ? () => true
    : matchers.contactMatcher(config.contact)

  const matchRoom = typeof config.room === 'undefined'
    ? () => true
    : matchers.roomMatcher(config.room)

  const matchSkipMessage = typeof config.skipMessage === 'undefined'
    ? () => false // default not skip any messages
    : matchers.messageMatcher(config.skipMessage)

  const matchMention = (typeof config.mention === 'undefined')
    ? atMatcher(true) // default: true
    : atMatcher(config.mention)

  const matchLanguage = (typeof config.language === 'undefined')
    ? () => true  // match all language by default
    : matchers.languageMatcher(config.language)

  const isPluginMessage = async (message: Message): Promise<boolean> => {
    if (message.self())                       { return false }
    if (message.type() !== Message.Type.Text) { return false }

    const mentionList = await message.mentionList()
    if (mentionList.length > 0) {
      if (!await message.mentionSelf()) { return false }
    }

    return true
  }

  const isConfigMessage = async (message: Message): Promise<boolean> => {
    const from = message.from()
    const room = message.room()

    if (await matchSkipMessage(message))                  { return false }

    if (room) {
      if (!await matchRoom(room))                         { return false }
      if (!await matchMention(message))                   { return false }

      /**
       * Mention others but not include the bot
       */
      const mentionList = await message.mentionList()
      const mentionSelf = await message.mentionSelf()
      if (mentionList.length > 0 && !mentionSelf)         { return false }
    } else {
      if (from && !await matchContact(from))              { return false }
    }

    const text = await message.mentionText()
    if (!matchLanguage(text))                             { return false }

    return true
  }

  /**
   * Connect with Wechaty
   */
  return function WechatyWeixinOpenAIPlugin (wechaty: Wechaty) {
    log.verbose(PRE, 'WechatyWeixinOpenAIPlugin(%s)', wechaty)

    wechaty.on('message', async message => {
      log.verbose(PRE, 'WechatyWeixinOpenAIPlugin() wechaty.on(message) %s', message)

      if (!await isPluginMessage(message)) {
        log.silly(PRE, 'WechatyWeixinOpenAIPlugin() wechaty.on(message) message not match this plugin, skipped.')
        return
      }

      if (!await isConfigMessage(message)) {
        log.silly(PRE, 'WechatyWeixinOpenAIPlugin() wechaty.on(message) message not match config, skipped.')
        return
      }

      const text = await message.mentionText()
      if (!text) { return }

      const from = message.from()
      const room = message.room()

      const answer = await WeixinOpenAI.Instance.aiBot(text, from.id)

      /**
       * PreAnswerHook logic, if the hook return false, will skip further process of the message
       */
      if (typeof config.preAnswerHook === 'function') {
        let sentimentData: SentimentData | undefined
        if (config.includeSentiment) {
          sentimentData = await WeixinOpenAI.Instance.sentiment(text, from.id)
        }
        const shouldProceed = await config.preAnswerHook(message, answer, sentimentData)
        if (typeof shouldProceed === 'boolean' && !shouldProceed) {
          return
        }
      }

      if (answer.status === ANSWER_STATUS.NOMATCH && noAnswerHook) {
        await noAnswerHook(message)
        return
      }
      const msg = answer.msg
      const correctMessage = msg[0]

      const reply = correctMessage.content.replace(/LINE_BREAK/g, '\n')

      if (from && room && await message.mentionSelf()) {
        await room.say(reply, from)
      } else {
        await message.say(reply)
      }

    })

  }
}

export { WechatyWeixinOpenAI }

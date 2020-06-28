import {
  Wechaty,
  WechatyPlugin,
  log,
  Message,
}                   from 'wechaty'
import {
  matchers,
}                   from 'wechaty-plugin-contrib'

import { asker }            from './asker'
import { normalizeConfig }  from './normalize-config'
import { atMatcher }        from './at-matcher'

export interface WechatyQnAMakerConfig {
  contact? : matchers.ContactMatcherOptions,
  room?    : matchers.RoomMatcherOptions,
  at?      : boolean,

  endpointKey?     : string,
  knowledgeBaseId? : string,
  resourceName?    : string,
}

function WechatyQnAMaker (config: WechatyQnAMakerConfig): WechatyPlugin {
  log.verbose('WechatyQnAMaker', 'WechatyQnAMaker(%s)', JSON.stringify(config))

  const {
    endpointKey,
    knowledgeBaseId,
    resourceName,
  }                   = normalizeConfig(config)

  const ask = asker({
    endpointKey,
    knowledgeBaseId,
    resourceName,
  })

  const matchContact = typeof config.contact === 'undefined'
    ? () => true
    : matchers.contactMatcher(config.contact)

  const matchRoom = typeof config.room === 'undefined'
    ? () => true
    : matchers.roomMatcher(config.room)

  const matchAt = atMatcher(config.at)

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

    if (from && !await matchContact(from))  { return false }

    if (room) {
      if (!await matchRoom(room))           { return false }
      if (!await matchAt(message))          { return false }
    }

    return true
  }

  /**
   * Connect with Wechaty
   */
  return function WechatyQnAMakerPlugin (wechaty: Wechaty) {
    log.verbose('WechatyQnAMaker', 'WechatyQnAMakerPlugin(%s)', wechaty)

    wechaty.on('message', async message => {
      log.verbose('WechatyQnAMaker', 'WechatyQnAMakerPlugin() wechaty.on(message) %s', message)

      if (!await isPluginMessage(message)) {
        log.silly('WechatyQnAMaker', 'WechatyQnAMakerPlugin() wechaty.on(message) message not match this plugin, skipped.')
        return
      }

      if (!await isConfigMessage(message)) {
        log.silly('WechatyQnAMaker', 'WechatyQnAMakerPlugin() wechaty.on(message) message not match config, skipped.')
        return
      }

      const text = await message.mentionText()
      if (!text) { return }

      const answer = await ask(text)
      if (!answer) { return }

      const from = message.from()
      const room = message.room()

      if (from && room && await message.mentionSelf()) {
        await room.say(answer, from)
      } else {
        await message.say(answer)
      }

    })

  }
}

export { WechatyQnAMaker }

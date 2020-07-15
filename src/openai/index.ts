import jwt        from 'jsonwebtoken'
import axios      from 'axios'
import { log }    from 'wechaty'

import { AI_BOT_URL, SENTIMENT_URL }     from './const'
import {
  AIBotRequestBody,
  AIBotRequestResponse,
  ANSWER_STATUS,
}                         from './schema/aibot'
import { SENTIMENT_MODE, SentimentResponse, SENTIMENT_KEY_MAP, SentimentData } from './schema/sentiment'

/**
 * This is a singleton class
 */
class WeixinOpenAI {

  private static instance: WeixinOpenAI
  public static get Instance () {
    if (!this.instance) {
      throw new Error('No instance found, call init first.')
    }
    return this.instance
  }

  /**
   * This method needs to be called before every other call on
   * the instance, this will pass the token and encodingAESKey
   * to weixin openai api for authorization
   * @param token token
   * @param encodingAESKey encoding aes key
   */
  public static init (token: string, encodingAESKey: string) {
    this.instance = new WeixinOpenAI(token, encodingAESKey)
  }

  /**
   * ---------------------------------------------------
   * Instance method below
   * ---------------------------------------------------
   */

  /**
   * use token and encoding aes key to call weixin openai api
   * @param token token
   * @param encodingAESKey encoding aes key
   */
  private constructor (
    private token: string,
    private encodingAESKey: string,
  ) {
    log.info(`WeixinOpenAI constructor(${this.token.slice(0, 5)}, ${this.encodingAESKey.slice(0, 10)})`)
  }

  /**
   * Call Weixin OpenAI aibot api to get the response of a give message
   * @param msg query message needs to be answered
   * @param username user who ask the question
   */
  public async aiBot (query: string, userId: string) {
    const originalUrl = AI_BOT_URL
    const signature = this.encodeJwt({ userid: userId })
    const data: AIBotRequestBody = {
      query,
      signature,
    }
    const result = await this.request(originalUrl, data)
    return result as AIBotRequestResponse
  }

  public async sentiment (query: string, userId: string, mode = SENTIMENT_MODE.SIX_CLASS) {
    const originalUrl = SENTIMENT_URL
    const tokenData = this.encodeJwt({
      data: {
        mode,
        q: query,
      },
      uid: userId,
    })
    const result: SentimentResponse = await this.request(originalUrl, {
      query: tokenData,
    })
    return result.result.reduce<SentimentData>((prev, cur) => {
      const key = SENTIMENT_KEY_MAP[cur[0]]
      return { ...prev, [key]: cur[1] }
    }, {})
  }

  private async request (
    originalUrl: string,
    data: any,
  ) {
    const url = `${originalUrl}/${this.token}`
    const result = await axios.post(url, data)

    return result.data
  }

  private encodeJwt (data: any) {
    const signature = jwt.sign(
      data,
      this.encodingAESKey,
      { algorithm: 'HS256' },
    )
    return signature
  }

}

export {
  WeixinOpenAI,
  ANSWER_STATUS,
  AIBotRequestBody,
  AIBotRequestResponse,
  SentimentData,
}

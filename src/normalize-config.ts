import { WechatyWeixinOpenAIConfig } from './plugin'

function normalizeConfig (config: WechatyWeixinOpenAIConfig) {
  const WECHATY_WEIXIN_OPENAI_TOKEN            = 'WECHATY_WEIXIN_OPENAI_TOKEN'
  const WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY = 'WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY'

  let token          = config.token
  let encodingAESKey = config.encodingAESKey

  if (!token) {
    token = process.env[WECHATY_WEIXIN_OPENAI_TOKEN]
  }
  if (!encodingAESKey) {
    encodingAESKey = process.env[WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY]
  }

  if (!token) {
    throw new Error(`
      Wechaty Weixin OpenAI Plugin requires QnAMaker EndpointKey for authorization.
      Please set ${WECHATY_WEIXIN_OPENAI_TOKEN} environment variable,
      or set 'token' in plugin config.
    `)
  }

  if (!encodingAESKey) {
    throw new Error(`
      Wechaty Weixin OpenAI Plugin requires QnAMaker KnowledgeBaseID for get KB resources.
      Please set ${WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY} environment variable,
      or set 'knowledgeBaseId' in plugin config.
    `)
  }

  return {
    encodingAESKey,
    token,
  }

}

export { normalizeConfig }

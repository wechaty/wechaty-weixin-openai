import { WechatyQnAMakerConfig } from './plugin'

function normalizeConfig (config: WechatyQnAMakerConfig) {
  const WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY      = 'WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY'
  const WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID = 'WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID'
  const WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME     = 'WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME'

  let endpointKey     = config.endpointKey
  let knowledgeBaseId = config.knowledgeBaseId
  let resourceName    = config.resourceName

  if (!endpointKey)     { endpointKey     = process.env[WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY]       }
  if (!knowledgeBaseId) { knowledgeBaseId = process.env[WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID]  }
  if (!resourceName)    { resourceName    = process.env[WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME]      }

  if (!endpointKey) {
    throw new Error(`
      Wechaty QnAMaker Plugin requires QnAMaker EndpointKey for authorization.
      Please set ${WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY} environment variable,
      or set 'endpointKey' in plugin config.
    `)
  }

  if (!knowledgeBaseId) {
    throw new Error(`
      Wechaty QnAMaker Plugin requires QnAMaker KnowledgeBaseID for get KB resources.
      Please set ${WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID} environment variable,
      or set 'knowledgeBaseId' in plugin config.
    `)
  }

  if (!resourceName) {
    throw new Error(`
      Wechaty QnAMaker Plugin requires Resource Name for locating KB resources.
      Please set ${WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME} environment variable,
      or set 'resourceName' in plugin config.
    `)
  }

  return {
    endpointKey,
    knowledgeBaseId,
    resourceName,
  }

}

export { normalizeConfig }

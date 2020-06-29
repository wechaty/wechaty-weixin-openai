/**
 * QuickStart: QnA Maker client library
 *  https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/quickstart-sdk?tabs=visual-studio&pivots=programming-language-javascript#qnamakerruntimeclient-object-model
 *
 * Azure-Samples/cognitive-services-quickstart-code
 *  https://github.com/Azure-Samples/cognitive-services-quickstart-code/blob/master/javascript/QnAMaker/sdk/qnamaker_quickstart.js
 */
import * as msRest from '@azure/ms-rest-js'
import * as runtime from '@azure/cognitiveservices-qnamaker-runtime'

import { log } from 'wechaty'

interface QnAMakerOptions {
  endpointKey     : string,
  knowledgeBaseId : string,
  resourceName    : string,
  minScore        : number,
}

function asker (options: QnAMakerOptions) {
  log.verbose('WechatyQnAMaker', 'asker(%s)', JSON.stringify(options))

  const customHeaders = { Authorization: `EndpointKey ${options.endpointKey}` }

  const queryingURL = `https://${options.resourceName}.azurewebsites.net`
  const queryRuntimeCredentials = new msRest.ApiKeyCredentials({
    inHeader: { 'Ocp-Apim-Subscription-Key': options.endpointKey },
  })
  const runtimeClient = new runtime.QnAMakerRuntimeClient(queryRuntimeCredentials, queryingURL)

  return async function ask (question: string): Promise<void | string> {
    log.verbose('WechatyQnAMaker', 'ask(%s)', question)

    const requestQuery = await runtimeClient.runtime.generateAnswer(
      options.knowledgeBaseId,
      {
        question,
        // strictFilters: [
        //   {
        //     name: 'Category',
        //     value: 'api',
        //   },
        // ],
        top: 1,
      },
      { customHeaders }
    )
    // console.info(JSON.stringify(requestQuery))

    const answers = requestQuery.answers
    if (answers && answers.length > 0) {
      const score = answers[0].score
      log.verbose('WechatyQnAMaker', 'ask() answer.score=%s', score)

      if (score && score > options.minScore) {
        return answers[0].answer
      }
    }

  }

}

export {
  asker,
}

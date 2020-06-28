#!/usr/bin/env ts-node

import test  from 'tstest'

import { asker } from './asker'

test('asker()', async t => {
  const resourceName    = process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME
  const endpointKey     = process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY
  const knowledgeBaseId = process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID

  if (!resourceName || !endpointKey || !knowledgeBaseId) {
    throw new Error('required env variables not found')
  }

  const ask = asker({
    endpointKey,
    knowledgeBaseId,
    resourceName,
  })

  let answer = await ask('wechaty')
  t.true(answer, 'should get answer back: ' + answer)

  answer = await ask('中文')
  t.false(answer, 'should get no answer for 中文')
})

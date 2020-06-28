#!/usr/bin/env ts-node

import test  from 'tstest'

import { asker } from './asker'

test('asker()', async t => {
  const resourceName = 'wechaty'
  const endpointKey = '705a3468-12bb-4e10-a314-7daa947f18d6'
  const knowledgeBaseId = '254e33ad-ca6d-405d-980d-dbd3615e2605'

  const ask = asker({
    endpointKey,
    knowledgeBaseId,
    resourceName,
  })

  const answer = await ask('wechaty')
  console.info('answer:', answer)
  t.true(answer, 'should get answer back')
})

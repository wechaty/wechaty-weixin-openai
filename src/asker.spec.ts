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

  let answer = await ask('wechaty')
  t.true(answer, 'should get answer back: ' + answer)

  answer = await ask('中文')
  t.false(answer, 'should get no answer for 中文')
})

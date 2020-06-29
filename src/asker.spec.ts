#!/usr/bin/env ts-node

import test  from 'tstest'

import { asker } from './asker'
import { normalizeConfig } from './normalize-config'

test('asker()', async t => {
  const config = normalizeConfig({})
  const ask = asker(config)

  let answer = await ask('wechaty')
  t.true(answer, 'should get answer back: ' + answer)

  answer = await ask('中文')
  t.false(answer, 'should get no answer for 中文')
})

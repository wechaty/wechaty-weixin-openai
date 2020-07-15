#!/usr/bin/env ts-node

import test  from 'tstest'

import { WeixinOpenAI } from './index'

const TEST_TOKEN = 'gtuHmKG1Qb9HxVg0CFjuwh9oyrEkR8'
const TEST_ENCODING_AES_KEY = 'FAxvcz6hDwQWhZtryYSRqHuK7S1jhxpxfpdszOwfBW3'

test.only('It should call the endpoint and get the response correctly', async t => {
  WeixinOpenAI.init(TEST_TOKEN, TEST_ENCODING_AES_KEY)
  const result = await WeixinOpenAI.Instance.aiBot('句子不动', 'test-user')
  t.assert(result.msg.length > 0)
})

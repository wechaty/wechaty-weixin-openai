#!/usr/bin/env ts-node

import test  from 'tstest'

import { WeixinOpenAI } from './index'
import { SENTIMENT_MODE } from './schema/sentiment'

const TEST_TOKEN = process.env.WECHATY_WEIXIN_OPENAI_TOKEN!
const TEST_ENCODING_AES_KEY = process.env.WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY!

test('It should call the endpoint and get the response correctly', async t => {
  WeixinOpenAI.init(TEST_TOKEN, TEST_ENCODING_AES_KEY)
  const result = await WeixinOpenAI.Instance.aiBot('句子不动', 'test-user')
  t.assert(result.msg.length > 0)
})

test('It should call the sentiment api and get the response correctly', async t => {
  WeixinOpenAI.init(TEST_TOKEN, TEST_ENCODING_AES_KEY)
  const result = await WeixinOpenAI.Instance.sentiment('你有病吧', 'test-user')
  t.assert(Object.keys(result).length === 6)
})

test('It should call the sentiment api with six class and get the right response', async t => {
  WeixinOpenAI.init(TEST_TOKEN, TEST_ENCODING_AES_KEY)
  const result = await WeixinOpenAI.Instance.sentiment('你有病吧', 'test-user', SENTIMENT_MODE.THREE_CLASS)
  t.assert(Object.keys(result).length === 3)
})

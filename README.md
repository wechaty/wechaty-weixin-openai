# wechaty-weixin-openai

[![NPM Version](https://img.shields.io/npm/v/wechaty-weixin-openai?color=brightgreen)](https://www.npmjs.com/package/wechaty-weixin-openai)
[![NPM](https://github.com/wechaty/wechaty-weixin-openai/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty-weixin-openai/actions?query=workflow%3ANPM)

[Weixin OpenAI](https://openai.weixin.qq.com/) is a cloud-based Natural Language Processing (NLP) service that easily creates a natural conversational layer over your data.

Wechaty Weixin OpenAI plugin enables your bot with Weixin OpenAI skills

[![Wechaty Plugin Weixin OpenAI](https://img.shields.io/badge/Wechaty%20Plugin-OpenAI-brightgreen)](https://github.com/wechaty/wechaty-weixin-openai)
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Introduction

Wechaty Weixin OpenAI Plugin helps you to answer questions in WeChat with the power of <https://openai.weixin.qq.com>.

![Weixin OpenAI Homepage](docs/images/weixin-openai-screenshot.png)

## Requirements

1. Node.js v12+
1. Wechaty v0.40+
1. This Weixin OpenAI Plugin
1. Registration of Weixin OpenAI platform
1. A bot in Weixin OpenAI platform

## Usage

```ts
import { Message, Wechaty } from 'wechaty'
import { WechatyWeixinOpenAI } from 'wechaty-weixin-openai'

const config = {
  at: true, // default true: require at the bot in room.
  room: true,
  contact: true, // enable direct message.

  /**
   * Weixin OpenAI config
   */
  token: 'your-valuable-token',
  encodingAESKey: 'very-secret-encoding-key',

  /**
   * No answer from Weixin OpenAI will call the below callback function
   */
  noAnswerCallback: (message: Message) => { console.log(`No Answer Message: ${message}`) }
}

const WeixinOpenAIPlugin = WechatyWeixinOpenAI(config)

const wechaty = new Wechaty()
wechaty.use(WeixinOpenAIPlugin)
```

### 1 Configure Weixin OpenAI

1. `config.token`: Token for Weixin OpenAI
1. `config.encodingAESKey`: Encoding AES key for Weixin OpenAI

### 2 Language of Questions

1. `config.language`: If set to a language ('chinese', 'english', etc), then the plugin will only reply message text in that specified language. (default: match all languages)

### 3 Matchers & Skipper

1. `config.contact`: Whether to allow direct message to be sync with ticket reply. `false` to deny all, `true` for allow all; Supports contact id(`string`) and contact name(`RegExp`). You can also mix them in array.
1. `config.room`: The room id of your service WeChat room.
1. `config.skipMessage`: If set it to `string` or `RegExp`, then the message text that match the config will not be processed by the plugin. Array supported.

## Environment Variables

The following two environment variables will be used if the required information is not provided by the config.

### 1 `WECHATY_WEIXIN_OPENAI_TOKEN`

`process.env.WECHATY_WEIXIN_OPENAI_TOKEN` will be used if the `config.token` is not provided.

### 2 `WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY`

`process.env.WECHATY_WEIXIN_OPENAI_ENCODING_AES_KEY` will be used if the `config.encodingAESKey` is not provided.

## History

### master

### v0.2 (Jun 29, 2020)

1. Init code base from wechaty-plugin-qnamaker
1. Weixin Open AI integration
1. Add aibot api integration with Weixin OpenAI
1. Add `noAnswer

## Contributors

## Author

[Yuan Gao](https://github.com/windmemory) ([高原](https://www.linkedin.com/in/windmemory)),
CTO & Co-founder of Juzi.bot, \<gaoyuan@juzi.bot\>

## Copyright & License

- Code & Docs © 2020 Yuan Gao \<gaoyuan@juzi.bot\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons

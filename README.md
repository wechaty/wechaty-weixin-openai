# wechaty-plugin-qnamaker

[![NPM Version](https://img.shields.io/npm/v/wechaty-plugin-qnamaker?color=brightgreen)](https://www.npmjs.com/package/wechaty-plugin-qnamaker)
[![NPM](https://github.com/wechaty/wechaty-plugin-qnamaker/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty-plugin-qnamaker/actions?query=workflow%3ANPM)

[QnA Maker](https://qnamaker.ai) is a cloud-based Natural Language Processing (NLP) service that easily creates a natural conversational layer over your data.

Wechaty QnAMaker Plugin can be used to find the most appropriate answer for WeChat users, from your custom knowledge base (KB) of information.

![Wechaty Plugin QnAMaker](docs/images/qnamaker-wechaty.png)

[![Wechaty Plugin QnAMaker](https://img.shields.io/badge/Wechaty%20Plugin-QnAMaker-brightgreen.svg)](https://github.com/wechaty/wechaty-plugin-qnamaker)
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Introduction

Wechaty QnAMaker Plugin helps you to answer questions in WeChat with the power of <https://QnAMaker.ai>.

![QnAMaker for Wechaty Community Knowledge Base](docs/images/qnamaker-screenshot.png)

## Requirements

1. Node.js v12+
1. Wechaty v0.40+
1. This QnAMaker Plugin
1. Azure Subscription for Congnitive Service
1. QnAMaker Knowledge Base (KB)

## Usage

```ts
import { WechatyQnAMaker } from 'wechaty-plugin-qnamaker'

const config = {
  at: true, // default true: require at the bot in room.
  room: true,
  contact: true, // enable direct message.

  /**
   * Language of Questions & Score of Answers
   */
  language: 'english',
  minScore: 50,   // minimum score for the answer

  /**
   * QnAMaker Service API
   */
  endpointKey: '705a3468-12bb-4e10-a314-7daa947f18d6',
  knowledgeBaseId: '254e33ad-ca6d-405d-980d-dbd3615e2605',
  resourceName: 'wechaty',
}

const QnAMakerPlugin = WechatyQnAMaker(config)

const wechaty = new Wechaty()
wechaty.use(QnAMakerPlugin)
```

### 1 Configure QnAMaker

1. `endpointKey`: Endpoint Key for QnAMaker.ai
1. `knowledgeBaseId`: Knowledge Base ID for your knowledge base (KB)
1. `resourceName`: Resource Name for your Cognitive Service. (for example, `wechaty` is the Resource Name for `https://wechaty.azurewebsites.net`)

### 2 Language of Questions & Score of Answers

1. `config.language`: If set to a language ('chinese', 'english', etc), then the plugin will only reply message text in that specified language. (default: match all languages)
1. `config.minScore`: If the answer from QnAMaker.ai service has a score below the `minScore`, then that answer will not be used. (A perfect score is `100`)

### 3 Matchers & Skipper

1. `config.contact`: Whether to allow direct message to be sync with ticket reply. `false` to deny all, `true` for allow all; Supports contact id(`string`) and contact name(`RegExp`). You can also mix them in array.
1. `config.room`: The room id of your service WeChat room.
1. `config.skipMessage`: If set it to `string` or `RegExp`, then the message text that match the config will not be processed by the plugin. Array supported.

## Environment Variables

The following two environment variables will be used if the required information is not provided by the config.

### 1 `WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY`

`process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY` will be used if the `config.endpointKey` is not provided.

### 2 `WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID`

`process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID` will be used if the `config.knowledgeBaseId` is not provided.

### 3 `WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME`

`process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME` will be used if the `config.resourceName` is not provided.

## Example

Our Friday BOT are using `wechaty-plugin-qnamaker` to connect our WeChat conversations with QnAMaker.

1. Source Code - You can read the source code from: <https://github.com/wechaty/friday/blob/master/src/plugins/qnamaker.ts>
1. Spreadsheets - You can read our Question & Answer Pairs for Wechaty Community from: <https://docs.google.com/spreadsheets/d/14o7ytbZDRyX53nn8F4VohBgzAP6pMnCRPWFFzdcyzxc/edit>

> Note: our question & answer pairs sheet are open to edit. Please feel free to add question & answer pair if you believe it's necessary, and thank you for your contribution!

## Resources

- [Quickstart: Test knowledge base with batch questions and expected answers](https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/batch-testing)

## History

### master

### v0.2 (Jun 29, 2020)

1. Init code base
1. QnAMaker integration
1. Add Language Detecter to limit the plugin to only answer a specific language(s)

## Contributors

[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/0)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/0)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/1)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/1)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/2)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/2)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/3)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/3)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/4)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/4)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/5)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/5)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/6)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/6)
[![contributor](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/images/7)](https://sourcerer.io/fame/huan/wechaty/wechaty-plugin-qnamaker/links/7)

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)),
Microsoft Regional Director & AI MVP, \<zixia@zixia.net\>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

- Code & Docs © 2020 Huan LI \<zixia@zixia.net\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons

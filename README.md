# wechaty-plugin-qnamaker

[![NPM Version](https://img.shields.io/npm/v/wechaty-plugin-qnamaker?color=brightgreen)](https://www.npmjs.com/package/wechaty-plugin-qnamaker)
[![NPM](https://github.com/wechaty/wechaty-plugin-qnamaker/workflows/NPM/badge.svg)](https://github.com/wechaty/wechaty-plugin-qnamaker/actions?query=workflow%3ANPM)

[QnAMaker](https://qnamaker.ai) is a ...

Wechaty QnAMaker Plugin ...

![Wechaty Plugin QnAMaker](docs/images/qnamaker-wechaty.png)

[![Wechaty Plugin QnAMaker](https://img.shields.io/badge/Wechaty%20Plugin-QnAMaker-brightgreen.svg)](https://github.com/wechaty/wechaty-plugin-qnamaker)
[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-brightgreen.svg)](https://github.com/Wechaty/wechaty)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Introduction

Wechaty QnAMaker Plugin helps you to ...

## Usage

```ts
import { WechatyQnAMaker } from 'wechaty-plugin-qnamaker'

const config = {
  contact: true, // enable direct message.
  room: 'room_id@chatroom',

  at              : true,
}

const QnAMakerPlugin = WechatyQnAMaker(config)

const wechaty = new Wechaty()
wechaty.use(QnAMakerPlugin)
```

1. `config.contact`: Whether to allow direct message to be sync with ticket reply. `false` to deny all, `true` for allow all; Supports contact id(`string`) and contact name(`RegExp`). You can also mix them in array.
1. `config.room`: The room id of your service WeChat room.

## Environment Variables

The following two environment variables will be used if the required information is not provided by the config.

### 1 `WECHATY_PLUGIN_QNAMAKER_....`

`process.env.WECHATY_PLUGIN_QnAMaker_PORTAL_URL` will be used if the `config.portalUrl` is not provided.

## Example

Our Friday BOT are using `wechaty-plugin-qnamaker` to connect our WeChat conversations with QnAMaker.

You can read the source code from: <https://github.com/wechaty/friday/blob/master/src/plugins/qnamaker.ts>

## History

### master

### v0.2 (Jun 29, 2020)

1. Init code base
1. QnAMaker integration

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

* Code & Docs © 2020 Huan LI \<zixia@zixia.net\>
* Code released under the Apache-2.0 License
* Docs released under Creative Commons

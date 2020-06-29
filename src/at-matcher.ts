import {
  Message,
  log,
}           from 'wechaty'

function atMatcher (at: boolean) {
  log.verbose('WechatyQnAMaker', 'atMatcher(%s)', at)

  return async function matchAt (message: Message): Promise<boolean> {
    const room = message.room()

    if (!room)                            { return false }

    if (at) {
      if (!await message.mentionSelf())   { return false }
    }

    return true
  }
}

export { atMatcher }

import { Message } from 'wechaty'

function atMatcher (at?: boolean) {
  let normalizedAt: boolean
  if (typeof at === 'undefined') {
    normalizedAt = true
  } else {
    normalizedAt = at
  }

  return async function matchAt (message: Message): Promise<boolean> {
    const room = message.room()

    if (!room)                            { return false }

    if (normalizedAt) {
      if (!await message.mentionSelf())   { return false }
    }

    return true
  }
}

export { atMatcher }

export enum SENTIMENT_MODE {
  THREE_CLASS = '3class',
  SIX_CLASS = '6class',
}

export type RawSentimentKey = '负面' | '正面' | '无情感' | '喜欢' | '高兴' | '厌恶' | '悲伤' | '愤怒'
export type SentimentKey = 'hate' | 'like' | 'sad' | 'angry' | 'none' | 'positive' | 'negative' | 'happy'
export const SENTIMENT_KEY_MAP = {
  厌恶: 'hate',
  喜欢: 'like',
  悲伤: 'sad',
  愤怒: 'angry',
  无情感: 'none',
  正面: 'positive',
  负面: 'negative',
  高兴: 'happy',
}

export type SentimentResult = [RawSentimentKey, number]

export interface SentimentResponse {
  error: any,
  result: SentimentResult[],
  costime: number,
}

export interface SentimentData {
  hate?: number,
  like?: number,
  sad?: number,
  angry?: number,
  none?: number,
  positive?: number,
  negative?: number,
  happy?: number,
}

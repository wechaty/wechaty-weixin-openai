import {
  log,
}         from 'wechaty'

const languageMonitor = require('language-monitor')

export type LanguageCode =  'chinese'
                          | 'danish'
                          | 'norwegian'
                          | 'japanese'
                          | 'dutch'
                          | 'swedish'
                          | 'cebuano'
                          | 'tagalog'
                          | 'german'
                          | 'indonesian'
                          | 'turkish'
                          | 'korean'
                          | 'portuguese'
                          | 'azeri'
                          | 'english'
                          | 'estonian'
                          | 'latin'
                          | 'slovene'
                          | 'swahili'
                          | 'hungarian'
                          | 'spanish'
                          | 'lithuanian'
                          | 'finnish'
                          | 'hawaiian'
                          | 'icelandic'
                          | 'italian'

interface GuessedLanguage {
  code: LanguageCode,
  rate: number,
}

function detectLanguage (text: string, limit?: number): GuessedLanguage[] {
  return languageMonitor(text, limit)
}

function includeLanguage (
  resultList: GuessedLanguage[],
  language: LanguageCode,
  threshold = 0.1,
) {
  const minThreshold = (min: number) => (result: GuessedLanguage) => result.rate > min
  const toCode = (result: GuessedLanguage) => result.code

  return resultList
    .filter(minThreshold(threshold))
    .map(toCode)
    .includes(language)
}

function languageMatcher (code: LanguageCode) {
  log.verbose('WechatyQnAMaker', 'languageMatcher(%s)', code)

  return function matchLanguage (text: string) {
    const resultList = detectLanguage(text)
    return includeLanguage(resultList, code)
  }

}

export {
  detectLanguage,
  languageMatcher,
  includeLanguage,
}

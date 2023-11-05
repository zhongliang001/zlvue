import { App } from 'vue'
import * as locale from '../../locale'
let lang: string | null = ''

class ZlLang {
  private static instance: ZlLang
  private _lang: string
  private _language: object
  constructor(lang: string, language: object) {
    ;(this._lang = lang), (this._language = language)
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new ZlLang('', {})
    }
    return this.instance
  }

  set lang(newLang: string) {
    this._lang = newLang
    this._language = locale[newLang]
    console.log('lang设置为', newLang, this)
  }

  get lang(): string {
    return this._lang
  }

  get language(): object {
    return this._language
  }

  private set language(language: object) {}
}
const zlLang: ZlLang = ZlLang.getInstance()

const initConfig = (app: App, config?: any) => {
  if (!config) {
    lang = localStorage.getItem('language')
  } else {
    lang = config['language']
  }
  if (!lang) {
    lang = navigator.language.replaceAll('-', '')
  }
  zlLang.lang = lang
  app.provide('zlLang', zlLang)
}

const configProps = {
  lang: {
    type: String
  }
}

export { initConfig, configProps }

// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ZlInput: typeof import('../packages/zl-vue')['ZlInput']
  }
  interface ComponentCustomProperties {}
}

export {}

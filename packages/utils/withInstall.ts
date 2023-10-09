import type { App, Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin

const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = function (app: App) {
    app.component((comp as any).name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}

export default withInstall

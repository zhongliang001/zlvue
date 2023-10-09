import type { Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin
declare const withInstall: <T>(comp: T) => SFCWithInstall<T>
export default withInstall

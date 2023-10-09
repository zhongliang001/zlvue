import type { App } from 'vue'
const coms: any = import.meta.glob('./*.vue', { eager: true })
const install1 = (app: App): void => {
  for (const objname in coms) {
    const myval = coms[objname]
    app.component(objname.substring(2).replace('.vue', ''), myval.default)
  }
}

export default {
  install1
}

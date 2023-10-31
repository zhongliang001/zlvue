import * as components from './components'
import { installAll } from '@zl-vue/utils/withInstall'
const install = installAll(components.installer)
export default install
export * from '@zl-vue/components/index'

import { series, parallel } from 'gulp'
import { withTashName, run, runTask, projectRoot, copyTypesDefinitions } from './src'
import consola from 'consola'

export default series(
  withTashName('clean', async () => {
    consola.info(`${projectRoot}`)
    run('pnpm run clean')
  }),
  // withTashName('buildPackage', () => run('pnpm run  --parallel build --filter ./packages/'))
  parallel(runTask('buildModules'), runTask('buildTypeDefine')),
  parallel(copyTypesDefinitions)
)

export * from './src'

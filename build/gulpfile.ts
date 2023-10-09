import { series, parallel } from 'gulp'
import { withTashName, run } from './index'
import os from 'os'

export default series(
  withTashName('clean', async () => {
    if (os.type().startsWith('Windows')) {
      try {
        run('powershell.exe rm -r dist ')
      } catch (e) {
        console.log(e)
      }
    } else {
      run('rm -r dist ')
    }
  }),
  withTashName('buildPackage', () => run('pnpm run  --parallel build --filter ./packages/'))
)

export * from '../packages/components/gulpfile'

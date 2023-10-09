import { series, src, dest, parallel } from 'gulp'
import { buidConfig } from './config'
import { outDir, projectRoot } from './paths'
import ts from 'gulp-typescript'
import gv from 'gulp-vueify'
import path from 'path'
import { withTashName } from '.'
const buildPackages = (dirname: string, name: string) => {
  // 打包模式
  const tasks = Object.entries(buidConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    return series(
      withTashName(`build:${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsConfig.json')
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true,
              strict: false,
              module: config.module
            })()
          )
          .pipe(dest(output))
      }),

      withTashName(`copy:${dirname}`, () => {
        console.log('+++++++++++++++')

        console.log(outDir, config.output.name, name)

        return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
      })
    )
  })
  return parallel(...tasks)
}
export { buildPackages }

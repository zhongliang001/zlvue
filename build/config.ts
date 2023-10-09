import path from 'path'
import { outDir } from './paths'
export const buidConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    output: {
      name: 'es',
      path: path.resolve(outDir, 'es')
    },
    bundle: {
      path: 'zl-vue/es'
    }
  }
  // ,
  // cjs: {
  //   module: "CommonJS",
  //   format: 'cjs',
  //   output: {
  //     name: 'lib',
  //     path: path.resolve(outDir, 'lib')
  //   },
  //   bundle: {
  //     path: 'zl-vue/lib'
  //   }
  // }
}

export type BuildConfig = typeof buidConfig

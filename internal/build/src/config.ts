import path from 'path'
import { ModuleFormat } from 'rollup'
import { outDir, PKG_NAME } from './paths'
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(outDir, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(outDir, 'lib')
    },
    bundle: {
      path: `${PKG_NAME}/lib`
    }
  }
}

export type BuildConfig = typeof buildConfig
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries
export type BuildConfigEntries = [Module, BuildInfo][]
export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    path: string
  }

  bundle: {
    path: string
  }
}

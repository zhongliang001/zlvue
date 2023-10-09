import { ModuleFormat, OutputOptions, rollup, RollupBuild } from 'rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { parallel, series } from 'gulp'
import { glob } from 'fast-glob'
import { run } from '../../build'
import path from 'path'

const target = 'es2018'
const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

export const testmodule = async () => {
  const input = excludeFiles(
    await glob('**/*.{ts,vue}', {
      cwd: 'F://node//zlvue//packages',
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: false
          }),
          vueJsx: vueJsx()
        }
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts'
        }
      })
    ],
    //external: await generateExternal({ full: false }),
    treeshake: false,
    output: {
      dir: 'F://node/vvvv'
    }
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: 'F://node/vvvv',
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve('F://node/vvvv', 'es')
    },
    bundle: {
      path: `test/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve('F://node/vvvv', 'lib')
    },
    bundle: {
      path: `test/lib`
    }
  }
}
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries

export const modules = ['esm', 'cjs'] as const
export type Module = (typeof modules)[number]

export type BuildConfigEntries = [Module, BuildInfo][]

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export const withTaskName = <T extends Function>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`))

export default series(parallel(runTask('testmodule')))

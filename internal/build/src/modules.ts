import { OutputOptions, rollup } from 'rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { glob } from 'fast-glob'
import { outDir, packagesDir } from './paths'
import { buildConfigEntries } from './config'
import { excludeFiles, generateExternal, target, writeBundles } from './utils'
import typescript from 'rollup-plugin-typescript2'
import consola from 'consola'
import chalk from 'chalk'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: packagesDir,
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
      }),
      typescript()
    ],
    external: await generateExternal({ full: false }),
    treeshake: false
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: outDir,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

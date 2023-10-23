/* eslint-disable no-debugger */
import consola from 'consola'
import chalk from 'chalk'
import { excludeFiles, withTaskName } from './utils'
import { glob } from 'fast-glob'
import { outDir, packagesDir, projectRoot } from './paths'
import { Project, SourceFile } from 'ts-morph'
import path from 'path'
import { copy } from 'fs-extra'
import * as vueCompiler from 'vue/compiler-sfc'
import { readFile, writeFile } from 'fs/promises'
import { mkdir, write } from 'fs'
import { buildConfig, Module } from './config'
import { parallel, TaskFunction } from 'gulp'

export const buildTypeDefine = async () => {
  // const outDir = "F:\\vvvvv11"
  consola.info(`${chalk.red(`生成d.ts文件`)}`)
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir,
      baseUrl: projectRoot,
      preserveSymlinks: true,
      skipLibCheck: true,
      noImplicitAny: false
    },
    tsConfigFilePath: '../../tsconfig.web.json',
    skipAddingFilesFromTsConfig: true
  })
  const sourceFiles: SourceFile[] = await addFiles(project)

  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
  await project.emit({
    emitOnlyDtsFiles: true
  })
  const tasks = sourceFiles.map(async (sf) => {
    const relativePath = path.relative(packagesDir, sf.getFilePath())
    consola.trace(chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`))
    const emitOutput = sf.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
    }

    const subTasks = emitFiles.map(async (em) => {
      const filepath = em.getFilePath()
      await mkdir(
        path.dirname(filepath),
        {
          recursive: true
        },
        (e) => {}
      )

      await writeFile(filepath, pathRewriter('esm')(em.getText()), 'utf8')
    })
    await Promise.all(subTasks)
  })
  await Promise.all(tasks)
}

async function addFiles(project: Project) {
  const input = excludeFiles(
    await glob('**/*.{js,ts}', {
      cwd: packagesDir + '/zl-vue',
      onlyFiles: true
    })
  )

  consola.info(`----------------获取到文件数2222${packagesDir}`)
  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!zl-vue/**/*', '!node_modoules/**/*'], {
      cwd: packagesDir,
      absolute: true,
      onlyFiles: true
    })
  )

  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${path.relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...input.map(async (file) => {
      const content = await readFile(path.resolve(packagesDir + '/zl-vue', file), 'utf-8')
      sourceFiles.push(project.createSourceFile(path.resolve(packagesDir, file), content))
    })
  ])

  consola.info(`----------------获取到文件数2222${sourceFiles.length}`)
  return sourceFiles
}

export const pathRewriter = (module: Module) => {
  const config = buildConfig[module]
  return (id: string) => {
    id = id.replaceAll(`@zl-vue/theme-chalk`, `zl-vue/theme-chalk`)
    id = id.replaceAll(`@zl-vue/`, `${config.bundle.path}/`)
    return id
  }
}

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(outDir, 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

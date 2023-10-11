import consola from 'consola'
import chalk from 'chalk'
import { OutputOptions, RollupBuild } from 'rollup'
import { packagesDir, projectDir, projectRoot } from './paths'
import { spawn } from 'child_process'
import type { ProjectManifest } from '@pnpm/types'
import { resolve } from 'path'
function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export const withTaskName = <T extends Function>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, projectDir))

export const run = async (command: string, cwd: string = projectRoot) =>
  new Promise<void>((resolve, reject) => {
    consola.info(`根路径: ${chalk.red(`${cwd}`)}`)
    const [cmd, ...args] = command.split(' ')
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`)
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)

      if (code === 0) resolve()
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`))
    })
    process.on('exit', onProcessExit)
  })
const withTashName = <T>(name: string, fn: T & any) => Object.assign(fn, { displayName: name })

const target = 'es2018'
const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(resolve(packagesDir, 'zl-vue'))
  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}

export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath + '\\package.json')
  const { dependencies = {}, peerDependencies = {} } = manifest
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

export { withTashName, writeBundles, target, excludeFiles }

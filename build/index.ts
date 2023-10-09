import { projectRoot } from './paths'
import { spawn } from 'child_process'
const withTashName = <T>(name: string, fn: T & any) => Object.assign(fn, { displayName: name })
export { withTashName }

export const run = async (command: string) => {
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true // linux 才支持rm -rf
    })
    app.on('close', resolve)
  })
}

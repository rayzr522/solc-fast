import { execa } from 'execa'
import { dirname, join } from 'node:path'

export function getPaths() {
  const packageDir = dirname(dirname(new URL(import.meta.url).pathname))
  const cacheDir = join(
    packageDir.split('node_modules')[0],
    'node_modules',
    '.cache',
    'solc-fast'
  )
  const binPath = join(cacheDir, 'solc')

  return { packageDir, cacheDir, binPath }
}

export function execSolc(...args) {
  const { binPath } = getPaths()
  return execa(binPath, args)
}

export async function getSolcVersion() {
  try {
    const { stdout } = await execSolc('--version')
    return stdout.split('Version: ')[1]?.trim() ?? null
  } catch {
    return null
  }
}

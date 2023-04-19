import got from 'got'
import { createWriteStream, existsSync } from 'node:fs'
import { mkdir, rm } from 'node:fs/promises'
import { platform } from 'node:process'
import { pipeline } from 'node:stream/promises'
import { getPaths, getSolcVersion } from './utils.mjs'

export const TAG_TO_DOWNLOAD = '0.8.19'

function getDownloadUrl() {
  switch (platform) {
    case 'linux':
      return `https://github.com/ethereum/solidity/releases/download/v${TAG_TO_DOWNLOAD}/solc-static-linux`
    case 'darwin':
      return `https://github.com/ethereum/solidity/releases/download/v${TAG_TO_DOWNLOAD}/solc-macos`
    case 'win32':
      return `https://github.com/ethereum/solidity/releases/download/v${TAG_TO_DOWNLOAD}/solc-windows.exe`
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }
}

async function installSolc() {
  const { cacheDir, binPath } = getPaths()

  if (!existsSync(cacheDir)) {
    await mkdir(cacheDir, { recursive: true })
  }

  if (existsSync(binPath)) {
    try {
      const existingSolcVersion = await getSolcVersion()
      if (!existingSolcVersion) {
        console.warn('found existing solc but could not confirm version')
        await rm(binPath)
      } else if (!existingSolcVersion.includes(TAG_TO_DOWNLOAD)) {
        console.warn(
          'found existing solc but it was the wrong version, removing'
        )
        await rm(binPath)
      } else {
        console.warn(
          `solc already installed, skipping download (version: ${existingSolcVersion})`
        )
        return
      }
    } catch (e) {
      console.error('error checking existing solc version', e)
      process.exit(1)
    }
  }

  const executableWriteStream = createWriteStream(binPath, {
    mode: 0o755,
  })
  console.log(`downloading solc v${TAG_TO_DOWNLOAD}`)
  await pipeline(got.stream(getDownloadUrl()), executableWriteStream)

  const newVersion = await getSolcVersion()
  if (!newVersion) {
    throw new Error('could not confirm solc version after install')
  }
  console.log(`solc installed successfully (version: ${newVersion})`)
}

try {
  await installSolc()
} catch (e) {
  console.error('Error installing solc:', e)
  process.exit(1)
}

#!/usr/bin/env node

import { execaSync } from 'execa'
import { getPaths, getSolcVersion } from './utils.mjs'

const paths = getPaths()

try {
  const version = await getSolcVersion()
  if (version === null) {
    console.error('no solc version installed, did the postinstall script run?')
    process.exit(1)
  }
} catch (e) {
  console.error(e)
  process.exit(1)
}

try {
  execaSync(paths.binPath, process.argv.slice(2), { stdio: 'inherit' })
} catch {
  process.exit(1)
}

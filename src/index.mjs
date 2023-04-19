import { execSolc } from './utils.mjs'

/**
 * @param {import('solc-fast').SolidityStandardJsonInput} input The input to compile
 * @returns {Promise<import('solc-fast').SolidityStandardJsonOutput>} The output of the compilation
 */
export async function compile(input) {
  const solc = execSolc('--standard-json')
  solc.stdin.write(JSON.stringify(input))
  solc.stdin.end()
  const { stdout: output } = await solc
  return JSON.parse(output)
}

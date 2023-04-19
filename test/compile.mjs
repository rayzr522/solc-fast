import { compile } from '../src/index.mjs'

console.log(
  await compile({
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: 'pragma solidity ^0.8.0; contract Test {}',
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  })
)

# solc-fast

> a simple ESM wrapper around the native solc compiler to allow for faster compile times.

[`solc`](https://npmjs.com/package/solc) is convenient and easy to install, but it uses a WASM build of the solc compiler under the hood which is DRASTICALLY slower than using the native binary. this simple package downloads the solc native compiler and provides a simple wrapper function around calling it w/ the standard JSON format.

## installation

```bash
pnpm add solc-fast
```

## usage

```js
import { compile } from 'solc-fast'

const compiledOutput = await compile({
  language: 'Solidity',
  // ...
})
```

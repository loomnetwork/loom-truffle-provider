# Loom Truffle Provider

Adapter that allows `Truffle Suite` to communicate with a `Loom DappChain`.

## Install

```bash
yarn add loom-truffle-provider
# or
npm install loom-truffle-provider
```

## Requirements

```
Node >= 8
```

## Truffle

```
npm install -g truffle
```

## Description

Loom Truffle Provider makes it possible to deploy smart contracts written in Solidity and using Truffle Suite on a Loom
DappChain. Here's an example Truffle configuration that uses the Loom Truffle Provider...

```javascript
// truffle.js
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'

// ./privateKey file contains a base64 encoded key generated by the command:
// loom genkey -a publicKey -k privateKey
const privateKey = readFileSync('./privateKey', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)

// Create 10 extra accounts, useful for tests
loomTruffleProvider.createExtraAccounts(10)

module.exports = {
  networks: {
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
};
```

### Accounts managed by LoomTruffleProvider

In order to access accounts on `LoomTruffleProvider` you should use the function `getProviderEngine` which will return the `LoomProvider` giving access to properties `accountsAddrList` and `accounts`

```Javascript
const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
const loomProvider = loomTruffleProvider.getProviderEngine()

console.log("Accounts list", loomProvider.accountsAddrList)
console.log("Accounts and Private Keys", loomProvider.accounts)
```

## Notes

* Make sure that the `Loom DappChain` node is running before executing any `Truffle` command.
* The `Truffle` `network` option must be set to `loom_dapp_chain` when using the example configuration above, e.g. `truffle deploy --network loom_dapp_chain`.

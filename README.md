# Loom Truffle Provider

Adapter that allows Truffle Suite to communicate with Loom DappChain

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

Download and install [Truffle](https://github.com/trufflesuite/truffle)

## Description

Loom Truffle Provider allows to deploy smart contracts written on Solidity on Loom DappChain extending the Truffle use to Loom DappChain also. The following configuration is an example written on `truffle.js` (Truffle configuration)

```javascript
const { readFileSync } = require('fs')
const TruffleLoomAdapter = require('truffle-loom-provider')

const chainId    = 'default'
const writeUrl   = 'ws://127.0.0.1:46657/websocket'
const readUrl    = 'ws://127.0.0.1:9999/queryws'
const privateKey = readFileSync('./privateKey', 'utf-8')

const truffleLoomAdapter = new TruffleLoomAdapter(chainId, writeUrl, readUrl, privateKey)

module.exports = {
  networks: {
    loomdappchain: {
      provider: function() {
        return truffleLoomAdapter
      }, network_id: '*'
    }
  }
};
```

## Notes

* Make sure to have the Loom DappChain running before Truffle commands
* The configuration up above requires the Truffle network option (ex.: `truffle deploy --network loomdappchain`)

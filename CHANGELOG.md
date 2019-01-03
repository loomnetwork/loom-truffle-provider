v0.11.0
---

1. Enhancements

* Updated to `loom-js v1.38.0`
* Better support for `truffle v5` thanks to `loom-js`

v0.10.0
---

1. Enhancements

* Updated to `loom-js v1.37.1`

v0.9.0
---

1. Enhancements

* Updated to `loom-js v1.32.0`

v0.8.0
---

1. Enhancements

* Updated to `loom-js v1.27.1`

v0.7.0
---
1. Breaking Changes

* LoomProvider now returns the DAppChain ChainID as the network ID.

v0.6.0
---

1. Enhancements

* Updated to `loom-js v1.20.0`
* Added function `createExtraAccountsFromMnemonic(mnemonic:string, n:number)` which supports BIP-39 (mnemonic)

v0.5.0
---

1. Enhancements

* Updated to `loom-js v1.17.0`

v0.4.0
---

1. Enhancements

* Updated to `loom-js v1.14.0`

v0.3.0
---

1. Enhancements

* Updated to `loom-js v1.9.0`

v0.2.0
---

1. Enhancements

* Updated to `loom-js v1.8.0`
* Added support for newer `Truffle Suite v4.1.11`
* Better handling for `Truffle Suite` functions by `HTTP` communications
* Disconnect timeout of `3 seconds` isn't necessary anymore

v0.1.1
---

1. Enhancements

* Updated to `loom-js v1.7.0`
* Added function `getProviderEngine():LoomProvider` to give access to `LoomProvider`
* Added function `createExtraAccounts(n:number)` to create any number of new accounts, which is very useful when running tests
* Disconnecting socket after non activity after `3 seconds`
* Added documentation for each function
* Updates on README with examples


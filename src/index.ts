import {
  CryptoUtils, Client, LoomProvider, LocalAddress, NonceTxMiddleware, SignedTxMiddleware
} from 'loom-js'

class TruffleLoomProvider {
  private _engine: LoomProvider

  constructor(chainId: string, writeUrl:string , readUrl: string, privateKey: string) {
    const _privateKey = CryptoUtils.B64ToUint8Array(privateKey)
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(_privateKey)
    const client = new Client(chainId, writeUrl, readUrl)

    client.txMiddleware = [
      new NonceTxMiddleware(publicKey, client),
      new SignedTxMiddleware(_privateKey)
    ]

    this._engine = new LoomProvider(client)
    this._engine.addAccounts(LocalAddress.fromPublicKey(publicKey).toString())
    this._engine.on('error', (err: any) => {
      console.error('Error detected within Truffle process:', err)
    })
  }

  sendAsync(payload: any, callback: Function) {
    // Required to kill connection and not hang the process
    if (payload.method ===  'eth_uninstallFilter') {
      // Five seconds after uninstall filters
      setTimeout(() => this._engine.disconnect(), 5000)
    }

    this._engine.sendAsync(payload, callback)
  }

  send(payload: any, callback: Function) {
    return this._engine.send(payload, callback)
  }
}

module.exports = TruffleLoomProvider

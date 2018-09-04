import bip39 from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { CryptoUtils, Client, LoomProvider, createJSONRPCClient } from 'loom-js'

class TruffleLoomProvider {
  private _engine: LoomProvider

  /**
   * Constructs a new TruffleLoomProvider using LoomProvider to provide connection to Loom DAppChain.
   * @param chainId DAppChain identifier.
   * @param writeUrl Host & port to send txs, specified as "<protocol>://<host>:<port>".
   * @param readUrl Host & port of the DAppChain read/query interface, this should only be provided
   *                if it's not the same as `writeUrl`.
   * @param privateKey Account private key in Base64 string format
   */
  constructor(chainId: string, writeUrl: string, readUrl: string, privateKey: string) {
    const _privateKey = CryptoUtils.B64ToUint8Array(privateKey)
    const writer = createJSONRPCClient({ protocols: [{ url: writeUrl }] })
    const reader = createJSONRPCClient({ protocols: [{ url: readUrl }] })
    const client = new Client(chainId, writer, reader)

    this._engine = new LoomProvider(client, _privateKey)
    this._engine.on('error', (err: any) => {
      console.error('Error detected within Truffle process:', err)
    })
  }

  /**
   * Returns provider engine (LoomProvider)
   *
   * @returns Returns the LoomProvider
   */
  getProviderEngine(): LoomProvider {
    return this._engine
  }

  /**
   * Create extra accounts using mnemonic BIP-39
   *
   * Useful for create new accounts to running tests on Truffle
   *
   * @param mnemonic Mnemonic used to create accounts
   * @param quantity How many accounts to be created
   */
  createExtraAccountsFromMnemonic(mnemonic: string, quantity: number) {
    const seed = bip39.mnemonicToSeedHex(mnemonic)
    const privateKeys = Array.from(Array(quantity).keys()).map(index => {
      const data = derivePath(`m/44'/148'/${index}'`, seed)
      return CryptoUtils.generatePrivateKeyFromSeed(data.key)
    })
    this._engine.addAccounts(privateKeys)
  }

  /**
   * Create extra accounts
   *
   * Useful for create new accounts to running tests on Truffle
   *
   * @param quantity How many accounts to be created
   */
  createExtraAccounts(quantity: number) {
    const privateKeys = Array.from(Array(quantity).keys()).map(() =>
      CryptoUtils.generatePrivateKey()
    )
    this._engine.addAccounts(privateKeys)
  }

  /**
   * Send async calls to LoomProvider
   *
   * @param payload RPC call from Truffle
   * @param callback Callback function (err, value) => ()
   */
  sendAsync(payload: any, callback: Function) {
    this._engine.sendAsync(payload, callback)
  }

  /**
   * Same from sendAsync
   */
  send(payload: any, callback: Function) {
    return this._engine.send(payload, callback)
  }
}

module.exports = TruffleLoomProvider

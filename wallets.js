let wallets = require("./wallets.json");
const { Keypair, PublicKey } = require("@solana/web3.js");

class Wallet {
    /**
     * @type {PublicKey}
     */
    publicKey;
    /**
     * Class constructor
     * @param {string} str 
     */
    constructor(str){
        this.publicKey = new PublicKey(str);
    }
}

/**
 * @type {Record<string, Wallet>}
 */
let parsedWallets = {} 

Object.keys(wallets).forEach(name => {
    parsedWallets[name] = new Wallet(wallets[name]);
});

module.exports = parsedWallets;
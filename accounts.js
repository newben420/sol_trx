let accounts = require("./accounts.json");
const { Keypair, PublicKey } = require("@solana/web3.js");

class Account {
    /**
     * @type {Keypair}
     */
    keypair;

    /**
     * @type {PublicKey}
     */
    publicKey;
    /**
     * Class constructor
     * @param {string} str 
     */
    constructor(str){
        const keyArray = JSON.parse(str);
        const key = new Uint8Array(keyArray);
        const keypair = Keypair.fromSecretKey(key);
        const pubKey = keypair.publicKey;
        this.keypair = keypair;
        this.publicKey = pubKey;
    }
}

/**
 * @type {Record<string, Account>}
 */
let parsedAccounts = {} 

Object.keys(accounts).forEach(name => {
    parsedAccounts[name] = new Account(accounts[name]);
});

module.exports = parsedAccounts;
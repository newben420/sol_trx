const parsedAccounts = require("./accounts");
const conn = require("./conn");
const arg = process.argv.slice(2);
const { Keypair } = require("@solana/web3.js");
const fs = require("fs");
const path = require("path");

const name = arg[0];

if(!name) {
    console.log("Please provide a name for the new account");
    process.exit(1);
}

if (parsedAccounts[name]) {
    console.log(`Account named '${name}' already added to accounts.json`);
}
else {
    const newWallet = Keypair.generate();
    const kp = `[${newWallet.secretKey.toString()}]`;
    fs.writeFileSync(path.join(__dirname, "accounts.json"), JSON.stringify({ ...JSON.parse(fs.readFileSync(path.join(__dirname, "accounts.json"), "utf8")), [name]: kp }, null, "\t"), "utf8");
    console.log(`Account named '${name}' added to accounts.json`);
    console.log(`Public Key: ${newWallet.publicKey.toString()}`);
}

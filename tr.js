const parsedAccounts = require("./accounts");
const conn = require("./conn");
const arg = process.argv.slice(2);
const { Transaction, sendAndConfirmTransaction, SystemProgram } = require("@solana/web3.js");

const sender = arg[0];
const recepient = arg[1];
const amt = parseFloat(arg[2]) || 0;

if (parsedAccounts[sender] && parsedAccounts[recepient] && (amt ? (amt > 0) : false)) {
    console.log(`Sending SOL ${amt} from ${parsedAccounts[sender].publicKey.toString()} to ${parsedAccounts[recepient].publicKey.toString()}`);
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: parsedAccounts[sender].publicKey,
            toPubkey: parsedAccounts[recepient].publicKey,
            lamports: amt * 1e9,
        })
    );
    sendAndConfirmTransaction(conn, tx, [parsedAccounts[sender].keypair]).then(signature => {
        console.log(`Transaction completed with signature ${signature}`);
    }).catch(err => {
        console.log(`Transaction error `, err);
    });
}
else {
    console.log(`The correct syntax is node tr [sender_name] [rec_name] [amount]\n Both sender and rec must have been added to accounts.json, and amount must be greater than 0`)
}
// console.log(parsedAccounts);
// console.log(arg);
const dotenv = require("dotenv");
dotenv.config();

const { Connection } = require("@solana/web3.js");

const conn = new Connection(process.env.RPC, 'confirmed');

module.exports = conn;
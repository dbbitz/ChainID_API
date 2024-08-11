// src/config/blockchain.ts

import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();

const providerUrl = process.env.RPC_URL_SERVER;
const web3 = new Web3(providerUrl);
const contractAddress = process.env.CONTRACT_ADDRESS


export { web3, contractAddress };

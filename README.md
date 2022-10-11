# Ethers.js Simple Storage

A practice Simple Storage smart contract using Ethers.js.

## Run

Clone the repo, restore dependencies, and run `yarn compile` to compile the solidity code, generating the `.bin` and `.abi` files under `dist/`. Then, run `yarn build` to compile the typescript files and activate auto-compiling on save.

## Deploy to an evm-compatible chain

Create your `.env` from the `.env.example`, filling in your private key, encryption password, and RPC URL. Run `node dist/encryptKey.js` to encript your private key, and then `node dist/deploy.js` to deploy the contract.

Example output on the Goerli testnet: https://goerli.etherscan.io/address/0xc64C759a759595BeF69798547a0f0Eab22Ae493C

import { ethers } from "ethers";
import * as fs from "fs";
import "dotenv/config";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
    const encryptedJson = fs.readFileSync("./src/.encryptedKey.json", "utf-8");
    let wallet: ethers.Wallet = ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD!
    );
    wallet = await wallet.connect(provider);
    console.log(`Private key: ${wallet.privateKey}`);
    const abi = fs.readFileSync(
        "./dist/SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    );
    const bin = fs.readFileSync(
        "./dist/SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    );
    const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

    console.log("Deploying with the deploy() method:");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    console.log(`Contract address is: ${contract.address}`);
    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Current favorite number: ${currentFavoriteNumber.toString()}`);
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`New favorite number: ${updatedFavoriteNumber.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

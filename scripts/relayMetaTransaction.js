// scripts/relayMetaTransaction.js
const { ethers } = require("ethers");
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider("YOUR_INFURA_ENDPOINT"));

// Relayer private key and address
const relayerPrivateKey = Buffer.from("YOUR_PRIVATE_KEY", "hex");
const relayerAddress = "YOUR_RELAYER_ADDRESS";

// Meta-transaction smart contract details
const contractAddress = "META_TRANSACTION_CONTRACT_ADDRESS";
const contractABI = []; // Fill in with the ABI of your contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function relayMetaTransaction(metaTx, signature) {
    const txData = contract.methods
        .transferTokens(metaTx.recipient, metaTx.amount)
        .encodeABI();

    const txCount = await web3.eth.getTransactionCount(relayerAddress);

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(300000), // Adjust gas limit as needed
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
        to: contractAddress,
        data: txData,
    };

    const tx = new Tx(txObject, { chain: "mainnet", hardfork: "petersburg" });
    tx.sign(relayerPrivateKey);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    const receipt = await web3.eth.sendSignedTransaction(raw);
    console.log("Transaction receipt:", receipt);
}

// Example usage
const metaTx = {
    recipient: "RECIPIENT_ADDRESS",
    amount: web3.utils.toWei("1", "ether"), // Adjust as needed
};

const signature = {
    sigR: "SIGNATURE_R",
    sigS: "SIGNATURE_S",
    sigV: "SIGNATURE_V",
};

relayMetaTransaction(metaTx, signature)
    .then(() => console.log("Meta-transaction relayed"))
    .catch(console.error);

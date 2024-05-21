// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const trustedForwarder = "YOUR_TRUSTED_FORWARDER_ADDRESS"; // e.g., OpenZeppelin's minimal forwarder
    const styleTokenAddress = "YOUR_STYLE_TOKEN_ADDRESS";

    const MetaTransaction = await ethers.getContractFactory("MetaTransaction");
    const metaTransaction = await MetaTransaction.deploy(trustedForwarder, styleTokenAddress);

    await metaTransaction.deployed();
    console.log("MetaTransaction deployed to:", metaTransaction.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

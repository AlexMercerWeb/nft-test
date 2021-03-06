/*async function deploy() {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying the contract with address: ${deployer.address}`);
    console.log(`Address Balance: ${(await deployer.getBalance()).toString()}`);

    const contract = await ethers.getContractFactory("NFT");
    const deployedContract = await contract.deploy();

    console.log(`Contract deployed to address: ${deployedContract.address}`);
}

deploy().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
*/

const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(async function(taskArguments, hre) {
    const account = getAccount();
    console.log(`Account balance of ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the NFT contract").setAction(async function(taskArguments, hre) {
    const nftContractFactory = await hre.ethers.getContractFactory("NFT", getAccount());
    const deployedNft = await nftContractFactory.deploy();
    console.log(`NFT contract deployed to address: ${deployedNft.address}`);
});

const { task } = require("hardhat/config");
const { getContract } = require("./helpers");

task("mint", "mint an nft to the provided address")
    .addParam("address", "the address to received the minted nft")
    .setAction(async function(taskArguments, hre) {
	const contract = await getContract("NFT", hre);
	const transactionResponse = await contract.minTo(taskArguments.address, {
	    gasLimit: 500_000,
	});
	console.log(`Transaction Hash: ${transactionResponse.hash}`);
    });


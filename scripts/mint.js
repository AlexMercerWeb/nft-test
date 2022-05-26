const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const  fetch = require("node-fetch");

task("mint", "mint an nft to the provided address")
    .addParam("address", "the address to received the minted nft")
    .setAction(async function(taskArguments, hre) {
	const contract = await getContract("NFT", hre);
	const transactionResponse = await contract.minTo(taskArguments.address, {
	    gasLimit: 500_000,
	});
	console.log(`Transaction Hash: ${transactionResponse.hash}`);
    });

task("token-uri", "fetches token metadata of given token id")
    .addParam("tokenId", "id of token whose metadata to be fetched")
    .setAction(async function(taskArguments, hre){
	const contract = await getContract("NFT", hre);
	const metadata_url = (await contract.tokenURI(taskArguments.tokenId)).toString();

	console.log(`metadata url: ${metadata_url}`);

	const metadata = await fetch(metadata_url).then(res => res.json());
	console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
    });

task("set-base-uri", "sets base token uri")
    .addParam("baseUri", "new base token uri to be set")
    .setAction(async function(taskArguments, hre) {
	const contract = await getContract("NFT", hre);
	const response = await contract.setBaseUrl(taskArguments.baseUri);

	console.log(`Transaction Hash: ${response.hash}`);
    });

task("get-base-uri", "get base token uri").setAction(async function(taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const baseURI = await contract.getBaseTokenURI();

    console.log(`the baseURI is: ${baseURI.toString()}`);
});

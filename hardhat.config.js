/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("./scripts/deploy.js");
require("./scripts/mint.js");

const { RINKEBY_KEY, MUMBAI_KEY, PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

module.exports = {
    solidity: {
	compilers: [
	    {
		version: "0.8.0",
	    },
	    {
		version: "0.8.1",
	    }
	],
    },
    defaultNetwork: "rinkeby",
    networks: {
	hardhat: {},
	rinkeby: {
	    url: `https://ethereum-rinkeby--rpc.datahub.figment.io/apikey/${RINKEBY_KEY}`,
	    accounts: [`0x${PRIVATE_KEY}`]
	},
	mumbai: {
	    chainId: 80001,
	    url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_KEY}`,
	    accounts: [`0x${PRIVATE_KEY}`]
	},
    },
    etherscan: {
	apiKey: ETHERSCAN_KEY,
    },
};

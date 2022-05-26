// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, PullPayment, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    
    string public baseTokenURI;
    uint256 private totalSupply = 1000;
    uint256 private mintFee = 0.01 ether;
    
    constructor() ERC721("NFTTest", "NFTT"){
	baseTokenURI = "";
    }

    function minTo(address receipent) public payable returns(uint256) {
	uint256 currentSupply = currentTokenId.current();
	require(currentSupply < totalSupply, "Maximum supply reached!");
	require(msg.value == mintFee, "Value sent not correct, mint fee is 0.01 ether.");
	
	currentTokenId.increment();
	uint256 newTokenId = currentTokenId.current();
	_safeMint(receipent, newTokenId);
	return newTokenId;
    }

    function setBaseUrl(string memory _baseTokenURI) public{
	baseTokenURI = _baseTokenURI;
    }

    function _baseURI() internal view virtual override returns(string memory) {
	return baseTokenURI;
    }

    function getBaseTokenURI() public view returns(string memory) {
	return baseTokenURI;
    }
}

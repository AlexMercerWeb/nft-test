// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    constructor() ERC721("NFTTest", "NFTT"){}

    function minTo(address receipent) public returns(uint256) {
	currentTokenId.increment();
	uint256 newTokenId = currentTokenId.current();
	_safeMint(receipent, newTokenId);
	return newTokenId;
    }
}

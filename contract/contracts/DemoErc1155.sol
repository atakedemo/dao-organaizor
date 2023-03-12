// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DemoErc1155 is ERC1155 {

    address public contractOwner;

    //Token Id別の初期ミント数を指定（後で識別しやすいよう）
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant BRONZE = 2;

    string baseMetadataURIPrefix;
    string baseMetadataURISuffix;

    // コントラクトデプロイ時に１度だけ呼ばれる
    constructor() ERC1155("") {
        baseMetadataURIPrefix = "https://dao-org.4attraem.com/metadata/";
        baseMetadataURISuffix = ".json?alt=media";
        contractOwner = msg.sender;

        // デフォルトの所有者は msg.sender (コントラクトをデプロイした人）
        _mint(msg.sender, GOLD, 10, "");
        _mint(msg.sender, SILVER, 100, "");
        _mint(msg.sender, BRONZE, 1000, "");
    }

    
    function uri(uint256 _id) public view override returns (string memory) {
        // "https://~~~" + tokenID + ".json" の文字列結合を行っている
	    return string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(_id),
            baseMetadataURISuffix
        ));
    }

    function mint(uint256 _tokenId, uint256 _amount) public { 
        require(msg.sender == contractOwner, "you don't have a permission (Error : 403)");
        _mint(msg.sender, _tokenId, _amount, "");
    }

    function mintBatch(uint256[] memory _tokenIds, uint256[] memory _amounts) public { 
        require(msg.sender == contractOwner, "you don't have a permission (Error : 403)");
        _mintBatch(msg.sender, _tokenIds, _amounts, "");
    }

    function setBaseMetadataURI(string memory _prefix, string memory _suffix) public { 
        baseMetadataURIPrefix = _prefix;
        baseMetadataURISuffix = _suffix;
    }

    //オーナーの変更
    function updateContractOwner(address _newContractOwner) external {
        require(msg.sender == contractOwner, "you don't have a permission (Error : 403)");
        contractOwner = _newContractOwner;
    }
}
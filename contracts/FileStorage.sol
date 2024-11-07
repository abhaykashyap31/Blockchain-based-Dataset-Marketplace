// FileStorage.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        address owner;
        string fileHash; // IPFS or Filecoin hash
        mapping(address => bool) permissions; // Permission for each address
    }

    mapping(string => File) private files;

    event FileUploaded(string fileHash, address indexed owner);
    event AccessGranted(string fileHash, address indexed grantedTo);

    function uploadFile(string memory fileHash) external {
        files[fileHash].owner = msg.sender;
        files[fileHash].fileHash = fileHash;
        emit FileUploaded(fileHash, msg.sender);
    }

    function grantAccess(string memory fileHash, address user) external {
        require(files[fileHash].owner == msg.sender, "Only owner can grant access");
        files[fileHash].permissions[user] = true;
        emit AccessGranted(fileHash, user);
    }

    function checkAccess(string memory fileHash, address user) external view returns (bool) {
        return files[fileHash].owner == user || files[fileHash].permissions[user];
    }
}

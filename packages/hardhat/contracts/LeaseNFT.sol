// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./AccessManager.sol";

contract LeaseNFT is ERC721, AccessManagerBase {
    address private leaseAgreementAddress;

    event LeaseNFTMinted(address leaseOwner, uint256 leaseId, address minter);
    event LeaseNFTBurned(uint256 leaseId, address burner);
    event LeaseNFTAgreementSet(uint256 leaseId, address burner);

    constructor(address _accessManager) ERC721("LeaseNFT", "LEASE") AccessManagerBase(_accessManager) {}

    function setLeaseAgreementAddress(address _leaseAgreementAddress) external onlyAdmin {
        leaseAgreementAddress = _leaseAgreementAddress;
    }

    function mint(address _to, uint256 _leaseId) external {
        require(
            hasAdminRole() || _msgSender() == leaseAgreementAddress,
            "[LeaseNFT] Only LeaseAgreement contract can mint the lease"
        );
        _mint(_to, _leaseId);
        emit LeaseNFTMinted(_to, _leaseId, _msgSender());
    }

    function exists(uint256 _leaseId) public view returns (bool) {
        return _ownerOf(_leaseId) != address(0);
    }

    function burn(uint256 _leaseId) external {
        require(
            hasAdminRole() || _msgSender() == leaseAgreementAddress,
            "[LeaseNFT] Only LeaseAgreement can burn the lease"
        );
        _burn(_leaseId);
        emit LeaseNFTBurned(_leaseId, _msgSender());
    }
}
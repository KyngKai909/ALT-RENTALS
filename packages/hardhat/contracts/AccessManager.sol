// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AccessManager is AccessControl {
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    constructor(address admin) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /**
     * Use this modifier to manage the fonction access more granularly
     * @param _functionSig The signature of the function to be called
     */
    modifier functionRoleOrAdmin(bytes32 _functionSig) {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) || hasRole(_functionSig, _msgSender()),
            "[AccessManagement] Only the Admin or function granted user can interact"
        );
        _;
    }

    /**
     * @dev Add a validator to the contract
     */
    function addValidator(address _validator) public functionRoleOrAdmin(this.addValidator.selector) {
        grantRole(VALIDATOR_ROLE, _validator);
    }

    /**
     * @dev Remove a validator from the contract
     */
    function removeValidator(address _validator) public functionRoleOrAdmin(this.removeValidator.selector) {
        revokeRole(VALIDATOR_ROLE, _validator);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 _interfaceId) public view virtual override(AccessControl) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }
}

contract AccessManagerBase is Context {
    AccessManager accessManager;

    constructor(address _accessManager) {
        accessManager = AccessManager(_accessManager);
    }

    /**
     * Use this modifier to restrict to admin only
     */
    modifier onlyAdmin() {
        require(
            accessManager.hasRole(accessManager.DEFAULT_ADMIN_ROLE(), _msgSender()),
            "[AccessManagement] Only the admin can interact"
        );
        _;
    }

    /**
     * Use this modifier to restrict to validator only
     */
    modifier onlyValidator() {
        require(
            accessManager.hasRole(accessManager.VALIDATOR_ROLE(), _msgSender()),
            "[AccessManagement] Only the validator can interact"
        );
        _;
    }

    /**
     * Use this modifier to manage the fonction access more granularly
     */
    modifier onlyRole(bytes32 _role) {
        require(accessManager.hasRole(_role, _msgSender()), "[AccessManager] Only the validator can interact");
        _;
    }

    /**
     * Use this modifier to manage the fonction access more granularly
     * @param _functionSig The signature of the function to be called
     */
    modifier functionRoleOrAdmin(bytes32 _functionSig) {
        require(
            hasRole(accessManager.DEFAULT_ADMIN_ROLE(), _msgSender()) || hasRole(_functionSig, _msgSender()),
            "[AccessManagement] Only the Admin or function granted user can interact"
        );
        _;
    }

    function hasAdminRole() public view returns (bool) {
        return accessManager.hasRole(accessManager.DEFAULT_ADMIN_ROLE(), _msgSender());
    }

    function hasRole(bytes32 _role, address _address) public view returns (bool) {
        return accessManager.hasRole(_role, _address);
    }
}

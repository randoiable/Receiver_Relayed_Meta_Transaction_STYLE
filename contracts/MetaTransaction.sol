// contracts/MetaTransaction.sol
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "./IStyleToken.sol";

contract MetaTransaction is ERC2771Context {
    IStyleToken private styleToken;

    constructor(address _trustedForwarder, address _styleTokenAddress)
        ERC2771Context(_trustedForwarder)
    {
        styleToken = IStyleToken(_styleTokenAddress);
    }

    function transferTokens(address recipient, uint256 amount) external {
        require(styleToken.transfer(recipient, amount), "Token transfer failed");
    }

    function _msgSender() internal view override(ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}

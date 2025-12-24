// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * RELYK (RLK)
 * Utility-first ERC20 token on Polygon
 *
 * - Max supply: 100,000,000 RLK
 * - Initial mint: 20,000,000 RLK
 * - Owner-controlled minting (within cap)
 * - Burn enabled
 * - Ownership transferable (future multisig / DAO)
 */
contract RELYK is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10 ** 18;

    constructor(address initialOwner)
        ERC20("RELYK", "RLK")
        Ownable(initialOwner)
    {
        uint256 initialMint = 20_000_000 * 10 ** decimals();
        _mint(initialOwner, initialMint);
    }

    /**
     * Mint new tokens (cannot exceed MAX_SUPPLY)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "RLK: Max supply exceeded"
        );
        _mint(to, amount);
    }

    /**
     * Burn tokens from caller
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * Burn tokens from another account (requires allowance)
     */
    function burnFrom(address account, uint256 amount) external {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "RLK: Burn exceeds allowance");
        _approve(account, msg.sender, currentAllowance - amount);
        _burn(account, amount);
    }
}

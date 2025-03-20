// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicTokenSwap {
    address public owner;
    mapping(address => mapping(address => uint256)) public exchangeRates;

    event SwapExecuted(address indexed fromToken, address indexed toToken, address indexed user, uint256 amountIn, uint256 amountOut);

    constructor() {
        owner = msg.sender;
    }

    function setExchangeRate(address fromToken, address toToken, uint256 rate) public {
        require(msg.sender == owner, "Only owner can set exchange rates");
        exchangeRates[fromToken][toToken] = rate;
    }

    function swap(address fromToken, address toToken, uint256 amountIn) public {
        require(exchangeRates[fromToken][toToken] > 0, "Exchange rate not set");
        uint256 amountOut = amountIn * exchangeRates[fromToken][toToken];

        emit SwapExecuted(fromToken, toToken, msg.sender, amountIn, amountOut);
    }
}


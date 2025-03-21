const contractAddress = "0x84B0945311c3f06439234E767F8a6BD1C66725dA";
const contractABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "fromToken", "type": "address" },
            { "name": "toToken", "type": "address" },
            { "name": "rate", "type": "uint256" }
        ],
        "name": "setExchangeRate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "fromToken", "type": "address" },
            { "name": "toToken", "type": "address" },
            { "name": "amountIn", "type": "uint256" }
        ],
        "name": "swap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let contract;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Connected to MetaMask:", accounts[0]);
    } else {
        alert("Please install MetaMask!");
    }
}

async function setExchangeRate() {
    const fromToken = document.getElementById("fromToken").value;
    const toToken = document.getElementById("toToken").value;
    const rate = document.getElementById("exchangeRate").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.setExchangeRate(fromToken, toToken, rate).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Exchange rate set!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Error setting exchange rate.";
    }
}

async function swapTokens() {
    const fromToken = document.getElementById("fromToken").value;
    const toToken = document.getElementById("toToken").value;
    const amountIn = document.getElementById("amountIn").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.swap(fromToken, toToken, amountIn).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Swap executed!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Swap failed!";
    }
}

window.onload = init;

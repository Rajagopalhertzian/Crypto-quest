let web3;

document.getElementById("connect").addEventListener("click", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        alert("Wallet connected!");
    } else {
        alert("Please install MetaMask!");
    }
});

document.getElementById("mint").addEventListener("click", async () => {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    fetch("/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: userAddress })
    })
    .then(response => response.json())
    .then(data => {
        if (data.txHash) {
            alert(`NFT Minted! Transaction Hash: ${data.txHash}`);
        } else {
            alert(`Error: ${data.error}`);
        }
    });
});

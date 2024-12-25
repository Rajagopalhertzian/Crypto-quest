let web3;
let userAddress;

// Connect to the wallet
document.getElementById("connect").addEventListener("click", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        userAddress = accounts[0];
        alert(`Wallet connected: ${userAddress}`);
        loadNFTs();
    } else {
        alert("Please install MetaMask!");
    }
});

// Simulate NFT minting
document.getElementById("mint").addEventListener("click", () => {
    if (!userAddress) {
        alert("Please connect your wallet first!");
        return;
    }

    // Create a fake NFT
    const nftId = Date.now();
    const nft = {
        id: nftId,
        name: `CryptoQuest NFT #${nftId}`,
        owner: userAddress,
    };

    // Store NFT in local storage
    const nfts = JSON.parse(localStorage.getItem("nfts") || "[]");
    nfts.push(nft);
    localStorage.setItem("nfts", JSON.stringify(nfts));

    alert(`NFT minted: ${nft.name}`);
    loadNFTs();
});

// Load NFTs owned by the connected user
function loadNFTs() {
    if (!userAddress) return;

    const nfts = JSON.parse(localStorage.getItem("nfts") || "[]");
    const userNFTs = nfts.filter((nft) => nft.owner === userAddress);

    const nftCollection = document.getElementById("nft-collection");
    nftCollection.innerHTML = "<h2>Your NFT Collection:</h2>";

    userNFTs.forEach((nft) => {
        const nftElement = document.createElement("div");
        nftElement.innerHTML = `<p>${nft.name}</p>`;
        nftCollection.appendChild(nftElement);
    });
}

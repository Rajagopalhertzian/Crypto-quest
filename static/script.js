let userAddress;

// Set the wallet address
document.getElementById("set-wallet").addEventListener("click", () => {
    const walletInput = document.getElementById("wallet").value.trim();
    if (walletInput === "") {
        alert("Please enter a valid wallet address!");
        return;
    }
    userAddress = walletInput;
    alert(`Wallet set: ${userAddress}`);
    loadNFTs();
    updateUI();
});

// Update the UI based on wallet presence
function updateUI() {
    const mintButton = document.getElementById("mint");
    if (userAddress) {
        mintButton.disabled = false;
    } else {
        mintButton.disabled = true;
    }
}

// Simulate NFT minting
document.getElementById("mint").addEventListener("click", () => {
    if (!userAddress) {
        alert("Please set a wallet address first!");
        return;
    }

    // Create a simulated NFT
    const nftId = Date.now();
    const nft = {
        id: nftId,
        name: `CryptoQuest NFT #${nftId}`,
        owner: userAddress,
    };

    // Store the NFT in local storage
    const nfts = JSON.parse(localStorage.getItem("nfts") || "[]");
    nfts.push(nft);
    localStorage.setItem("nfts", JSON.stringify(nfts));

    alert(`NFT minted: ${nft.name}`);
    loadNFTs();
});

// Load NFTs owned by the user
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

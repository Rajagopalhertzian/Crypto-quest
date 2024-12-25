from flask import Flask, jsonify, request, render_template
from web3 import Web3

app = Flask(__name__)

# Connect to Ethereum network
INFURA_URL = "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID"
web3 = Web3(Web3.HTTPProvider(INFURA_URL))

# Contract details
CONTRACT_ADDRESS = "0xYourContractAddress"
CONTRACT_ABI = [
    # Paste your contract ABI here
]

contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
web3.eth.default_account = "0xYourAdminAddress"  # Admin account for minting

# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/mint", methods=["POST"])
def mint_nft():
    data = request.json
    user_address = data["address"]

    try:
        tx = contract.functions.mint(user_address).buildTransaction({
            "from": web3.eth.default_account,
            "nonce": web3.eth.getTransactionCount(web3.eth.default_account),
            "gas": 3000000,
            "gasPrice": web3.toWei("20", "gwei")
        })

        private_key = "YOUR_PRIVATE_KEY"
        signed_tx = web3.eth.account.signTransaction(tx, private_key)
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        return jsonify({"txHash": web3.toHex(tx_hash)})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

// third party packages
const crypto = require('crypto');
const EthCrypto = require('eth-crypto');
const Web3 = require('web3');

// consts
const { ENCRYPTION_KEY, ENCRYPTION_IV_STRING, WEB3_URL } = require('../.env');

//creates a wallet on Ethereum
function createWallet() {
    const web3 = new Web3(WEB3_URL);
    const wallet = web3.eth.accounts.create();
    return {
        address: wallet.address,
        privateKey: wallet.privateKey
    };
}

// encrypts a private key
function encryptPrivateKey(privateKey) {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, ENCRYPTION_IV_STRING);
    let encryptedKey = cipher.update(privateKey, 'utf8', 'hex');
    encryptedKey += cipher.final('hex');
    return encryptedKey;
}

// decrypts a private key
function decryptPrivateKey(encryptedPrivateKey) {
    const cipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, ENCRYPTION_IV_STRING);
    let decryptedKey = cipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decryptedKey += cipher.final('utf8');
    return decryptedKey;
}

// encrypts a message
function signMessage(privateKey, message) {
    // stringify message
    const jsonMessage = JSON.stringify(message);

    // encrypt message
    const msgHash = EthCrypto.hash.keccak256(jsonMessage);

    // create and return a signature, removing the default '0x'
    return EthCrypto.sign(privateKey, msgHash).substring(2);
}

// encrypts a string
function signString(privateKey, string) {
    //encrypt string
    const stringHash = EthCrypto.hash.keccak256(string);

    //create and return a signature, removing the default '0x'
    return EthCrypto.sign(privateKey, stringHash).substring(2);
}

module.exports = {
    createWallet,
    signMessage,
    signString,
    encryptPrivateKey,
    decryptPrivateKey
}
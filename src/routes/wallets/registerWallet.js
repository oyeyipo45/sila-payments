// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// local packages
const { signMessage, signString, encryptPrivateKey, decryptPrivateKey, createWallet } = require('../../utils');

// consts
const { APP_HANDLE, APP_PRIVATE_KEY } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * creates and registers a new wallet for a user
 * @param data.userHandle [required] the user to recieve a new wallet
 */
async function registerWallet(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle
        },
    }

    // create the wallet and store its information
    const wallet = createWallet();

    // NOTE: Your app will need to secure user private keys using a KMS
    // ** THIS IS NOT A SECURE METHOD TO DO SO **
    // ** DO NOT USE THIS METHOD UNDER ANY CIRCUMSTANCES FOR ANYTHING OTHER THAN INITIAL TESTING **
    // ** CREATE AND INTEGRATE A KMS - EVEN FOR TESTING - AS QUICKLY AS POSSIBLE **
    // ** NEVER COMMIT OR SHARE PRIVATE KEYS **
    const entityFileName = `${wallet.address}.info.json`;
    const KMSEntityInfo = JSON.stringify({
        WALLET_ADDRESS: wallet.address,
        WALLET_PRIVATE_KEY: encryptPrivateKey(wallet.privateKey),
        USER_HANDLE: data.userHandle
    });
    await writeFile(entityFileName, KMSEntityInfo);

    // add the wallet to the body of the request
    body.wallet = {
        blockchain_address: wallet.address,
        blockchain_network: 'ETH',
        nickname: 'NEW_WALLET_NICKNAME',
    }

    // generate wallet verification signature and add it to the body
    const walletSignature = signString(wallet.privateKey, wallet.address);
    body.wallet_verification_signature = walletSignature;

    // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const authSignature = signMessage(APP_PRIVATE_KEY, body);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    }

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.REGISTER_WALLET,
            headers: headers,
            data: body,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    registerWallet
}
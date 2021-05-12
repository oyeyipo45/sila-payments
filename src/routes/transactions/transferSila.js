// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * transfers sila between two user's wallets
 * @param data.userHandle [required] the user to send funds
 * @param data.amount [required] the amount of Sila to transfer
 * @param data.destinationHandle [required] the user to receive the funds
 * @param data.destinationWallet [optional] nickname of desired destination wallet. if not provided will default to 'default'
 * @param data.destinationAddress [optional] blockchain address of desired destination. if not provided will default to 'default'
 */
async function transferSila(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle,
            reference: 'ref'
        },
        message: 'transfer_msg',
        destination_handle: data.destinationHandle,
        amount: data.amount,
    }

    if(data.destinationWallet) { body.destination_wallet = data.destinationWallet }
    else if(data.destinationAddress) body.destination_address = data.destinationAddress;

    // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    };

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.TRANSFER_SILA,
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
    transferSila
}
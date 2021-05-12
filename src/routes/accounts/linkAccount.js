// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey } = require('../../utils');

// consts
const { APP_HANDLE, APP_PRIVATE_KEY } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * links a bank account to a Sila wallet
 * @param data.userHandle [required] the user whose account will be linked
 * @param data.accountname [optional] defaults to 'default' if not included
 * @param data.selectedAccountID [optional] defaults to first checking account if not included
 */
async function linkAccount(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle
        }
    }

    if(data.accountName) body.account_name = data.accountName;
    if(data.selectedAccountID) body.selected_account_id = data.selectedAccountID;

    const plaidRequestBody = {
        public_key: 'fa9dd19eb40982275785b09760ab79',
        initial_products: ['transactions'],
        institution_id: 'ins_109508',
        credentials: {
            username: 'user_good',
            password: 'pass_good',
        }
    }

    // get the plaid token
    const response = await axios({
        method: 'post',
        url: 'https://sandbox.plaid.com/link/item/create',
        data: plaidRequestBody,
        validateStatus: () => { return true }
    });

    body.public_token = response.data.public_token;

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
            url: SILA_URLS.LINK_ACCOUNT,
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
    linkAccount
}
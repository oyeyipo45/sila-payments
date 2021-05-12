// third party packages
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey } = require('../../utils');

// consts
const { SILA_URLS } = require('../../consts');
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');

/**
 * deletes an information object associated with a user
 * @param data.userHandle [required] the handle of the user from whom information will be deleted
 * @param data.type [required] the type of the information object to be deleted. must be one of ['email', 'address', 'phone', 'identity']
 * @param data.uuid [required for all but email] the uuid of the information object to be deleted
 * >> uuids can be retrieved from /get_entity and are also returned from a successful /add/[info] call
 */

async function deleteUserInfo(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle,
            reference: 'ref',
        },
        uuid: data.uuid
    }

     // imitates retrieving the business' private key from your KMS
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
        usersignature: userSignature,
    }

    // build the request url
    const url = SILA_URLS.DELETE + data.type;

    // make request
    try {
        return await axios({
            method: 'post',
            url: url,
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
    deleteUserInfo
}
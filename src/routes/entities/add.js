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
 * adds user information to a user's profile
 * @param data.userHandle [required] the user being altered
 * @param data.type [required] type of information being added to the user
 * @param data.updateBody [required] must match the format of the data type being added
 * docs for update body can be found here: https://docs.silamoney.com/docs/addregistration-data
 */
async function add(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle
        },
    }

     // imitates retrieving the entity's private key from your KMS
    const entityInfo = await readFile(`./${data.userHandle}.info.json`, 'utf8')
    const parsedEntityInfo = JSON.parse(entityInfo);
    const encryptedPrivateKey = parsedEntityInfo.USER_PRIVATE_KEY;
    const ENTITY_PRIVATE_KEY = decryptPrivateKey(encryptedPrivateKey);

    if(!ENTITY_PRIVATE_KEY) return new Error('No user found');

    // add all included fields to the body, to avoid including empty strings
    for(const key of Object.keys(data.updateBody)) {
        body[key] = data.updateBody[key];
    }

    // generate authorization headers
    const authSignature = signMessage(APP_PRIVATE_KEY, body);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    }

    // build the request url
    const url = SILA_URLS.ADD + data.type;

    // request update
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
    add
}
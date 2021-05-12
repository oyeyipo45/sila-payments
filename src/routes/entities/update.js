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
 * updates pre-existing user information
 * @param data.userHandle [required] the handle of the user to be updated
 * @param data.type [required] the type of the information object to be deleted. must be one of ['address', 'identity', 'email', 'phone', 'entity']
 * @param data.uuid [required for all but entity] the uuid of the information object to be updated.
 * >> uuids can be retrieved from /get_entity and are also returned from a successful /add/[info] call
 * @param data.updateBody [required] must match the format of the data type being added
 */
async function update(data) {
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
 
    // if anything but entity is being updated, a uuid is needed
    if(data.uuid) body.uuid = data.uuid;

    // add all update fields to the body, to avoid over-writing data with empty strings
    for(const key of Object.keys(data.updateBody)) {
        body[key] = data.updateBody[key];
    }

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);
    const userSignature = signMessage(ENTITY_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature
    }

    // build the request url
    const url = SILA_URLS.UPDATE + data.type;

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
    update,
}
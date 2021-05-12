// third party packages
const axios = require('axios');

// local packages
const { signMessage } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * checks whether the submitted user handle is available for registration
 * @param data.userHandle the handle to be checked
 */
async function checkHandle(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.userHandle,
            reference: 'ref'
        },
        message: 'header_msg'
    }

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);

    const headers = {
        authsignature: authSignature
    };

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.CHECK_HANDLE,
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
    checkHandle
}
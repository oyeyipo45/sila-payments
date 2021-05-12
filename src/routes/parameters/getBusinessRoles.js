// third party packages
const axios = require('axios');

// local packages
const { signMessage } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * retrieves business roles
 */
async function getBusinessRoles() {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            reference: 'ref'
        }
    }

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);

    const headers = {
        authsignature: authSignature,
    };

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.GET_BUSINESS_ROLES,
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
    getBusinessRoles
}
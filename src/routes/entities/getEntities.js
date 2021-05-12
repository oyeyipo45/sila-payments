// third party packages
const axios = require('axios');

// local packages
const { signMessage } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * retrieves all entities associated with an app
 * @param data.entityType [optional] can be "individual" or "business". If excluded, will return all entities
 */
async function getEntities(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            reference: 'ref',
        },
        message: "header_msg",
    }

    if(data && data.entityType) body.entity_type = data.entityType;

    // generate authorization headers
    const authSignature = signMessage(APP_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
    }

    // request getEntities
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.GET_ENTITIES,
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
    getEntities
}
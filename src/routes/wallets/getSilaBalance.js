// third party packages
const axios = require('axios');

// consts
const { SILA_URLS } = require('../../consts');

/**
 * retrieves the balance of a wallet
 * @param data.blockchainAddress [required] the blockchainaddress to query
 */
async function getSilaBalance(data) {
    // prepare the request body
    const body = {
        blockchain_address: data.blockchainAddress
    }

    // request update
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.GET_SILA_BALANCE,
            data: body,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    getSilaBalance
}
// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { BLOCKCHAIN_ADDRESS_ONE } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/get_sila_balance', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_SILA_BALANCE,
            data: {
                blockchainAddress: BLOCKCHAIN_ADDRESS_ONE
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });

        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
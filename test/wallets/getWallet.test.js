// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { USER_HANDLE_INDIVIDUAL_ONE } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/get_wallet', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_WALLET,
            data: {
                userHandle: USER_HANDLE_INDIVIDUAL_ONE
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });

        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
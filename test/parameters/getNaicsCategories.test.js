// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

describe.skip('tests Sila API integration', () => {
    it('/get_naics_categories', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_NAICS_CATEGORIES,
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
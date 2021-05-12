// third party packages
const { expect } = require('chai');
const { v4 } = require('uuid');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

describe.skip('tests Sila API integration', () => {
    it('/check_handle', async () => {
        const handleToCheck = v4();
        
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.CHECK_HANDLE,
            data: {
                userHandle: handleToCheck,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
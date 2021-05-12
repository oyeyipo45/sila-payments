// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { USER_HANDLE_BUSINESS_ONE, USER_HANDLE_INDIVIDUAL_ONE } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/unlink_business_member', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UNLINK_BUSINESS_MEMBER,
            data: {
                businessHandle: USER_HANDLE_BUSINESS_ONE,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                role: 'administrator',
                ownership_stake: 100,
            },
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
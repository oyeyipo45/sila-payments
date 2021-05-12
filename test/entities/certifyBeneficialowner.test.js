// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { USER_HANDLE_BUSINESS_ONE, USER_HANDLE_INDIVIDUAL_ONE, CERTIFICATION_TOKEN_INDIVIDUAL_ONE } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/certify_beneficial_owner', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.CERTIFY_BENEFICIAL_OWNER,
            data: {
                businessHandle: USER_HANDLE_BUSINESS_ONE,
                adminHandle: USER_HANDLE_INDIVIDUAL_ONE,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                certificationToken: CERTIFICATION_TOKEN_INDIVIDUAL_ONE,
            },
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
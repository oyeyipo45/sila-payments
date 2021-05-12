// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    USER_HANDLE_INDIVIDUAL_ONE,
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
} = require('../../.env');

describe('tests Sila API integration', () => {
    it.skip('/delete/email', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: 'email',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_EMAIL,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/delete/phone', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: 'phone',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_PHONE,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/delete/identity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: 'identity',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_IDENTITY,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/delete/address', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: 'address',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_ADDRESS,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
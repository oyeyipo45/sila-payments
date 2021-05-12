// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    EMAIL,
    ADDRESS_ALIAS,
    STREET_ADDRESS_1,
    CITY,
    STATE,
    POSTAL_CODE,
    SSN,
    PHONE,
} = require('../consts');
const { USER_HANDLE_INDIVIDUAL_ONE } = require('../../.env');

describe('tests Sila API integration', () => {
    it.skip('/add/email', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: 'email',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                updateBody: {
                    email: EMAIL
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    it.skip('/add/address', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: 'address',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                updateBody: {
                    address_alias: ADDRESS_ALIAS,
                    street_address_1: STREET_ADDRESS_1,
                    city: CITY,
                    state: STATE,
                    country: 'US', // 'US' is the only acceptable country at this time
                    postal_code: POSTAL_CODE
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    it.skip('/add/phone', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: 'phone',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                email: EMAIL,
                updateBody: {
                    phone: PHONE
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    it.skip('/add/identity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.ADD,
            data: {
                type: 'identity',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                email: EMAIL,
                updateBody: {
                    identity_alias: 'SSN',
                    identity_value: SSN
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
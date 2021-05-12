// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
} = require('../../.env');
const { USER_HANDLE_INDIVIDUAL_ONE } = require('../../.env');

describe('tests Sila API integration', () => {
    it.skip('/update/entity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: 'entity',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                updateBody: {
                    first_name: 'NewFirst',
                    last_name: 'NewLast',
                    birthdate: '1990-01-01',
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/update/email', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: 'email',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_EMAIL,
                updateBody: {
                    email: 'newemail@newemail.com'
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/update/address', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: 'address',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_ADDRESS,
                updateBody: {
                    address_alias: 'new address alias',
                    street_address_1: 'New Place',
                    street_address_2: 'PO Box New',
                    city: 'New City',
                    state: 'AL',
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/update/phone', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: 'phone',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_PHONE,
                updateBody: {
                    phone: '0987654321'
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/update/identity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: 'identity',
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_IDENTITY,
                updateBody: {
                    identity_alias: 'SSN',
                    identity_value: '333221111'
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
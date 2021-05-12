// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    ADDRESS_ALIAS,
    STREET_ADDRESS_1,
    CITY,
    STATE,
    POSTAL_CODE,
    PHONE,
    SSN,
    BIRTHDATE
} = require('../consts');

describe('tests Sila API integration', () => {
    it.skip('/register minimal individual', async () => {
        const userInfo = {
            entity: {
                first_name: FIRST_NAME,
                last_name: LAST_NAME,
            }
        }

        const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);
        
        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it.skip('/register complete individual', async () => {
        const userInfo = {
            address: {
                address_alias: ADDRESS_ALIAS,
                street_address_1: STREET_ADDRESS_1,
                city: CITY,
                state: STATE,
                country: "US",
                postal_code: POSTAL_CODE
            },
            identity: {
                identity_alias: "SSN",
                identity_value: SSN
            },
            contact: {
                phone: PHONE,
                email: EMAIL,
            },
            entity: {
                first_name: FIRST_NAME,
                last_name: LAST_NAME,
                birthdate: BIRTHDATE,
            }
        }

        const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: userInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);
        
        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
    
    it.skip('/register business', async () => {
        const businessInfo = {
            entity: {
                entity_name: 'test business',
                business_type: 'corporation',
                naics_code: 721,
                type: 'business',
            }
        }

        const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: businessInfo
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);
        
        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});
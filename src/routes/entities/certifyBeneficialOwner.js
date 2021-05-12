// third party packages
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// local packages
const { signMessage, decryptPrivateKey } = require('../../utils');

// consts
const { APP_PRIVATE_KEY, APP_HANDLE } = require('../../../.env');
const { SILA_URLS } = require('../../consts');

/**
 * certifies an individual entity as a beneficial owner of a business entity
 * @param data.adminHandle [required] the admin performing the certification
 * @param data.businessHandle [required] the handle of the business associated with the certification
 * @param data.userHandle [required] the handle of the individual being certified
 * @param data.certificationToken [required] the certification token required for certification (retrieved from /get_entity on user)
 */
async function certifyBeneficialOwner(data) {
    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: data.adminHandle,
            business_handle: data.businessHandle,
            reference: 'ref'
        },
        member_handle: data.userHandle,
        certification_token: data.certificationToken
    }

    // imitates retrieving the user's private key from your KMS
    // * this endpoint requires the user to be an admin
    // ** DO NOT EVER COMMIT FILES THAT CONTAIN PRIVATE KEYS **
     const userInfo = await readFile(`./${data.adminHandle}.info.json`, 'utf8')
     const parsedUserInfo = JSON.parse(userInfo);
     const encryptedUserPrivateKey = parsedUserInfo.USER_PRIVATE_KEY;
     const USER_PRIVATE_KEY = decryptPrivateKey(encryptedUserPrivateKey);
    
    if(!USER_PRIVATE_KEY) return new Error('No user found');    

    // imitates retrieving the business' private key from your KMS
     const businessInfo = await readFile(`./${data.businessHandle}.info.json`, 'utf8')
     const parsedBusinessInfo = JSON.parse(businessInfo);
     const encryptedBusinessPrivateKey = parsedBusinessInfo.USER_PRIVATE_KEY;
     const BUSINESS_PRIVATE_KEY = decryptPrivateKey(encryptedBusinessPrivateKey);
    
    if(!BUSINESS_PRIVATE_KEY) return new Error('No user found');    

    // generate authorization headers
    const appPrivateKey = APP_PRIVATE_KEY;
    const authSignature = signMessage(appPrivateKey, body);
    const businessSignature = signMessage(BUSINESS_PRIVATE_KEY, body);
    const userSignature = signMessage(USER_PRIVATE_KEY, body);

    const headers = {
        authsignature: authSignature,
        usersignature: userSignature,
        businesssignature: businessSignature,
    };

    // make request
    try {
        return await axios({
            method: 'post',
            url: SILA_URLS.CERTIFY_BENEFICIAL_OWNER,
            headers: headers,
            data: body,
            validateStatus: () => { return true }
        });
    } catch(error) {
        console.log('error: ', error);
        return error;
    }
}

module.exports = {
    certifyBeneficialOwner
}
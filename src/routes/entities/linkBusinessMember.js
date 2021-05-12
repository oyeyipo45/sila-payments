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
const SILA_BUSINESS_USER_ROLES = {
    ADMIN: 'administrator',
    BENEFICIAL_OWNER: 'beneficial_owner',
    CONTROLLING_OFFICER: 'controlling_officer',

}

/**
 * links an individual entity to a business entity as a business member
 * @param data.adminIsLinking [required true if the user performing the link is an admin]
 * @param data.adminUserHandle [required if the user performing the link is an admin] handle of the admin user
 * @param data.businessHandle [required] handle of the business to which the link is being made
 * @param data.userHandle [required] handle of the user to be linked
 * @param data.role [required] role of the business member
 * @param data.ownership_stake [required if role is "beneficial owner"] float (0 < n <= 100)
 * @param data.details [optional] string containing whatever details desired
 */
async function linkBusinessMember(data) {
    const userHandle = data.adminIsLinking ? data.adminUserHandle : data.userHandle;

    // prepare the request body
    const body = {
        header: {
            created: Math.floor(Date.now() / 1000),
            auth_handle: APP_HANDLE,
            user_handle: userHandle,
            business_handle: data.businessHandle,
            reference: 'ref'
        },
        role: data.role,
    }

    if(data.adminIsLinking) body.member_handle = data.userHandle;
    if(data.role === SILA_BUSINESS_USER_ROLES.BENEFICIAL_OWNER) body.ownership_stake = data.ownership_stake;
    if(data.details) body.details = data.details;

    // imitates retrieving the user's private key from your KMS
    // * if an admin is linking the member, the user in /userInfo.json must be the admin
    // * if an admin is NOT linking the member, the user in /userInfo.json must be the user to be linked
    // * you can also manually create a /adminInfo.json file and use it here
    // ** DO NOT EVER COMMIT FILES THAT CONTAIN PRIVATE KEYS **
     const userInfo = await readFile(`./${userHandle}.info.json`, 'utf8')
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
            url: SILA_URLS.LINK_BUSINESS_MEMBER,
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
    linkBusinessMember
}
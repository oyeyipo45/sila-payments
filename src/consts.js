// sila
const SILA_BASE_SANDBOX_URL = 'https://sandbox.silamoney.com/0.2';

const SILA_URLS = {
    // entities
    CHECK_HANDLE: `${SILA_BASE_SANDBOX_URL}/check_handle`,
    REGISTER_USER: `${SILA_BASE_SANDBOX_URL}/register`,
    ADD: `${SILA_BASE_SANDBOX_URL}/add/`,
    UPDATE: `${SILA_BASE_SANDBOX_URL}/update/`,
    DELETE: `${SILA_BASE_SANDBOX_URL}/delete/`,
    LINK_BUSINESS_MEMBER: `${SILA_BASE_SANDBOX_URL}/link_business_member`,
    UNLINK_BUSINESS_MEMBER: `${SILA_BASE_SANDBOX_URL}/unlink_business_member`,
    REQUEST_KYC: `${SILA_BASE_SANDBOX_URL}/request_kyc`,
    CHECK_KYC: `${SILA_BASE_SANDBOX_URL}/check_kyc`,
    CERTIFY_BENEFICIAL_OWNER: `${SILA_BASE_SANDBOX_URL}/certify_beneficial_owner`,
    CERTIFY_BUSINESS: `${SILA_BASE_SANDBOX_URL}/certify_business`,
    GET_ENTITIES: `${SILA_BASE_SANDBOX_URL}/get_entities`,
    GET_ENTITY: `${SILA_BASE_SANDBOX_URL}/get_entity`,

    // acounts
    LINK_ACCOUNT: `${SILA_BASE_SANDBOX_URL}/link_account`,
    GET_ACCOUNTS: `${SILA_BASE_SANDBOX_URL}/get_accounts`,
    GET_ACCOUNT_BALANCE: `${SILA_BASE_SANDBOX_URL}/get_account_balance`,

    // wallets
    REGISTER_WALLET: `${SILA_BASE_SANDBOX_URL}/register_wallet`,
    GET_WALLET: `${SILA_BASE_SANDBOX_URL}/get_wallet`,
    GET_WALLETS: `${SILA_BASE_SANDBOX_URL}/get_wallets`,
    UPDATE_WALLET: `${SILA_BASE_SANDBOX_URL}/update_wallet`,
    GET_SILA_BALANCE: `${SILA_BASE_SANDBOX_URL}/get_sila_balance`,
    DELETE_WALLET: `${SILA_BASE_SANDBOX_URL}/delete_wallet`,

    // transactions
    ISSUE_SILA: `${SILA_BASE_SANDBOX_URL}/issue_sila`,
    TRANSFER_SILA: `${SILA_BASE_SANDBOX_URL}/transfer_sila`,
    REDEEM_SILA: `${SILA_BASE_SANDBOX_URL}/redeem_sila`,
    GET_TRANSACTIONS: `${SILA_BASE_SANDBOX_URL}/get_transactions`,
    CANCEL_TRANSACTION: `${SILA_BASE_SANDBOX_URL}/cancel_transaction`,

    // parameters
    GET_BUSINESS_TYPES: `${SILA_BASE_SANDBOX_URL}/get_business_types`,
    GET_BUSINESS_ROLES: `${SILA_BASE_SANDBOX_URL}/get_business_roles`,
    GET_NAICS_CATEGORIES: `${SILA_BASE_SANDBOX_URL}/get_naics_categories`,
}

module.exports = {
    SILA_URLS
}
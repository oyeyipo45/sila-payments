const { SILA_PATHS, SILA_ROUTES } = require('./src/routes/index');

exports.silaAPI = async request => {
    const parsedBody = JSON.parse(request.body);
    const { apiPath, data } = parsedBody;
    
    console.log(`routing ${apiPath}`);

    // if there isn't an appropriate route, return an error
    if(!SILA_PATHS[apiPath]) {
        return {
            'headers': { 'Access-Control-Allow-Origin': '*' },
            'statusCode': 400,
            'body': {
                'success': false,
                'error': `Invalid API path: ${apiPath}`
            }
        }
    }

    // handle the request
    const response = await SILA_ROUTES[apiPath](data);
    const body = JSON.stringify(response.data);
    
    return {
        'statusCode': response.status,
        'headers': { 'Access-Control-Allow-Origin': '*' },
        'body': body
    };
};
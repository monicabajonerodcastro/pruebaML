const { URL } = require('url');

/**
 * 
 * buildUrl function
 * 
 * This function builds the targetURL to send to the back-end.
 * 
 * @param {string} path the path to send the request
 * @param {object} queryParams the object with the query params
 */
function buildURL(path, queryParams){
    const baseUrl = new URL(path, 'https://api.mercadolibre.com');
    if(queryParams){
        queryParams.map((param, index) => {
            baseUrl.searchParams.append(param.key, param.value);
        });
    }
    return baseUrl;
}

module.exports = {
    buildURL
}
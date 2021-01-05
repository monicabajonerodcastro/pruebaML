const { URL } = require('url');

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
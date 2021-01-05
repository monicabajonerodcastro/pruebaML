const UtilService = require("../services/UtilService");
const RequestService = require("../services/RequestService");

function searchItems(request, response){
    if(request.query && request.query.search){
        const targetURL = UtilService.buildURL('/sites/MLA/search', [{key: "q", value : request.query.search}]); 
        RequestService.sendRequest(targetURL, 
            (statusCode, data) => {
                if(data && data.results && data.results.length >= 4){
                    var filteredResults = data.results.slice(0,4);
                    data.results = filteredResults;
                }
                buildResponse(response, statusCode, data);
            },
            (statusCode, error) => buildResponse(response, statusCode, error)
        );
    }else{
        buildResponse(response, 400, buildBadRequestResponse(400, "bad_request" , "The search criteria is mandatory")); 
    }
    
}

function getProductDetail(request, response){
    if(request.params && request.params.id){
        const id = request.params.id;
        const targetURL = UtilService.buildURL(`/items/${id}`); 
        RequestService.sendRequest(targetURL,
            (statusCode, data) => {
                if(statusCode === 200){
                    getProductDescription(response, data);
                }else{
                    buildResponse(response, statusCode, data);
                }
            },
            (statusCode, error) => buildResponse(response, statusCode, error)
        );
    }else{
        buildResponse(response, 400, buildBadRequestResponse(400, "bad_request" , "The id is mandatory")); 
    }
}

function getProductDescription(response, productDetail){
    if(productDetail && productDetail.id){
        const id = productDetail.id;
        const targetURL = UtilService.buildURL(`/items/${id}/description`); 
        RequestService.sendRequest(targetURL,
            (statusCode, data) => {
                productDetail.description = data;
                buildResponse(response, statusCode, productDetail);
            },
            (statusCode, error) => buildResponse(response, statusCode, error)
        );
    }else{
        buildResponse(response, 400, buildBadRequestResponse(400, "bad_request" , "The id is mandatory")); 
    }
}

function buildResponse(response, statusCode, data){
    response.status(statusCode).send(data);
}

function buildBadRequestResponse(status, message, error){
    var badRequestResponse = {};
    badRequestResponse.message = message;
    badRequestResponse.error = error;
    badRequestResponse.status = status;
    return badRequestResponse;
}

module.exports = {
    searchItems,
    getProductDetail
}
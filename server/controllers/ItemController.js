/**
 * ItemController Controller
 * 
 * Controller to receive the requests from the frontend
 * 
 */

const UtilService = require("../services/UtilService");
const RequestService = require("../services/RequestService");

/**
 * searchItems function 
 * 
 * This function receives the request to get the search criteria 
 * and the response to set the status and data depending on 
 * MercadoLibre API response. If the API responds successfully 
 * with some items, the function will only return the first 4. 
 * 
 * @param {object} request the request must contain the search criteria as a query string
 * @param {object} response the response will have the status and response data depending on 
 *      the response of the API. If the request doesn't have the search criteria,
 *      it will respond with status 400 (bad request)
 * 
 */
function searchItems(request, response){
    if(request.query && request.query.search){
        const targetURL = UtilService.buildURL('/sites/MLA/search', 
            [{key: "q", value : request.query.search}]); 
        RequestService.sendRequest(targetURL, 
            (statusCode, data) => {
                if(data && data.results && data.results.length >= 4){
                    var filteredResults = data.results.slice(0,4);
                    data.results = filteredResults;
                    getCategoriesBySearchCriteria(request, response, data);
                }else{
                    buildResponse(response, statusCode, data);
                }
            },
            (statusCode, error) => buildResponse(response, statusCode, error)
        );
    }else{
        buildResponse(response, 400, buildBadRequestResponse("The search criteria is mandatory")); 
    }
}

/**
 * 
 * getProductDetail function
 * 
 * This function receives an item id to get the detail of that item.
 * First, the function sends a request to MercadoLibre API to get
 * the detail of the item, if the API responds successfully the
 * function will send another request to the API to get the description
 * of the product. The response of both requests will be returned inside
 * the same object to show them at the same time in the front-end.
 * 
 * @param {object} request the request must contain the item id
 * @param {object} response the response will have the status and response data depending on 
 *      the response of the API. If the request doesn't have the item id,
 *      it will respond with status 400 (bad request)
 */
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
        buildResponse(response, 400, buildBadRequestResponse("The id is mandatory")); 
    }
}

/**
 * 
 * getCategoriesBySearchCriteria function
 * 
 * This function uses the categories predictor exposed in the 
 * MercadoLibre API. The function sends the same search criteria 
 * to the API and then get the category details with the id of 
 * the returned category by the predictor.
 * 
 * @param {object} request the request is used to get the search criteria 
 * @param {object} response the response will have the category path detail
 * @param {object} data the data returned by the latest functions in order to
 *      be returned at the end of the function
 */
function getCategoriesBySearchCriteria(request, response, data){
    const targetURL = UtilService.buildURL('/sites/MLA/domain_discovery/search', 
            [{key: "limit", value : "1"},
             {key: "q", value: request.query.search}]); 
    RequestService.sendRequest(targetURL,
        (statusCode, categoryData) => {
            if(statusCode === 200){
                if(categoryData.length > 0){
                    getCategoryPath(response, categoryData[0].category_id, data);
                }else{
                    buildResponse(response, statusCode, data);
                }
            }else{
                buildResponse(response, statusCode, categoryData);
            }
        },
        (statusCode, error) => buildResponse(response, statusCode, error)
    );
}

/**
 * 
 * getCategoryPath function
 * 
 * This function gets the detail of the category by id to get its path.
 * 
 * @param {object} response the response will have the category path detail
 * @param {String} categoryId the category id that will be sent
 * @param {object} data the data returned by the latest functions in order to
 *      be returned at the end of the function
 */
function getCategoryPath(response, categoryId, data){
    const targetURL = UtilService.buildURL(`/categories/${categoryId}`); 
    RequestService.sendRequest(targetURL,
        (statusCode, pathData) => {
            if(statusCode === 200){
                data.categoryPath = pathData.path_from_root;
                buildResponse(response, statusCode, data);
            }else{
                buildResponse(response, statusCode, pathData);
            }
        },
        (statusCode, error) => buildResponse(response, statusCode, error)
    );
}

/**
 * 
 * getProductDescription
 * 
 * This function is in charge to send the request to MercadoLibre
 * API when the last request was successful and it has returned
 * the item detail. The complete response to that request will
 * be added to the item detail.
 * 
 * @param {object} response the response will have the status and response data depending on 
 *      the response of the API
 * @param {object} productDetail the productDetail must contain the
 *      item id, if not the function will return a status 400 (bad request)
 */

function getProductDescription(response, productDetail){
    if(productDetail && productDetail.id){
        const id = productDetail.id;
        const targetURL = UtilService.buildURL(`/items/${id}/description`); 
        RequestService.sendRequest(targetURL,
            (_statusCode, data) => {
                productDetail.description = data;
                getCategoryPath(response, productDetail.category_id, productDetail);
            },
            (statusCode, error) => buildResponse(response, statusCode, error)
        );
    }else{
        buildResponse(response, 400, buildBadRequestResponse("The id is mandatory")); 
    }
}

/**
 * 
 * buildResponse function
 * 
 * This function builds the response in a generic way. It receives
 * the params and returns the response with the set params. 
 * 
 * @param {*} response The received params will be set in the response
 * @param {*} statusCode The http status code
 * @param {*} data The data to be returned. If it is an error response, it
 *      should contain a descriptive message
 */

function buildResponse(response, statusCode, data){
    response.status(statusCode).send(data);
}

/**
 * 
 * buildBadRequestResponse function
 * 
 * The function is used to build the response when the request
 * has an error and the response will return a status 400.
 * 
 * @param {*} error This error message will be set in the object in order to
 *      specify the error.
 */

function buildBadRequestResponse(error){
    var badRequestResponse = {};
    badRequestResponse.message = "bad_request";
    badRequestResponse.error = error;
    badRequestResponse.status = 400;
    return badRequestResponse;
}

module.exports = {
    searchItems,
    getProductDetail
}
import {BASE_PATH, API_VERSION} from "./config";

/**
 * getDetailsAPI function
 * 
 * This function sends the request to the back-end and returns the response in a json format
 * 
 * @param {string} path the path where the request will be sent
 */
export function sendRequest(path){
    const url = `${BASE_PATH}/${API_VERSION}/${path}`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        }).catch(err => {
            return err;
        });
}
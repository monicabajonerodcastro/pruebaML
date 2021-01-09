const https = require("https");

/**
 * 
 * sendRequest function
 * 
 * This function sends the request to the backend and executes the callback functions received as
 * parameters.
 * 
 * @param {string} targetURL the url to send the request
 * @param {function} successReturn the callback function when the request is successful
 * @param {function} errorReturn the callback function when the request is failed
 */

function sendRequest(targetURL, successReturn, errorReturn){
    https.get(targetURL.href, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                successReturn(res.statusCode, JSON.parse(rawData));
            } catch (e) {
                errorReturn(500, e.message);
            }
        }).on('error', (e) => {
            errorReturn(500, `Got error: ${e.message}`);
        });
    });
}

module.exports = {
    sendRequest
}
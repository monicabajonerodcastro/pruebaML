const https = require("https");

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
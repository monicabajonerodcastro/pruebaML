import {BASE_PATH, API_VERSION} from "./config";

export function searchItemsApi(querySearch){
    const url = `${BASE_PATH}/${API_VERSION}/items?search=${querySearch}`;

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
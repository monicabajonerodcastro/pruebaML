import {BASE_PATH, API_VERSION} from "./config";

export function getDetailsApi(id){
    const url = `${BASE_PATH}/${API_VERSION}/items/${id}`;

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
import axios from "axios";

export const API_url = "https://challenge.3fs.si/storage/";
export const API_token = "Token 0d6d7282-2323-47f8-9686-28afa17e9ff3";

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if(expectedError){
        alert("An expected error occured.");
    return Promise.reject(error);}
});

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete
}
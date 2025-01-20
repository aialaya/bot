import api from "./request.js";

const converToUrl = (requestParams) => {
    let params = [];
    for (let key in requestParams) {
        let param = key + "=" + requestParams[key];
        params.push(param);
    }
    return "?" + params.join("&");
};

export { api, converToUrl };
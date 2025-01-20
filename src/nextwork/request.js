import axios from 'axios';
import { useTokenStore } from "../store/index.js";
import { httpSign } from "@/utils/wasm.js"
import { useRouter } from 'vue-router';
const router = useRouter();
const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
    headers: { "Content-Type": "application/json" },
});



service.interceptors.request.use(
    (config) => {
        let tokenStore = useTokenStore();
        if (tokenStore.getToken) {
            config.headers["Authorization"] = "Bearer " + tokenStore.getToken;
        }
        config.headers["Accept-Language"] = "en"
        const url = config.url || '' ;
        const method = config.method?.toUpperCase() || '';
        const data = config.data || '';
        const params = config.params || '';
        const query = Object.entries(params)
            .map(([key, value]) => {
                if (value) {
                    return `${key}=${value}`;
                }
                return '';
            })
            .join('&');
        const body = typeof data === 'string' ? data : JSON.stringify(data);
        const sign = httpSign(url, query, method, body);
        Object.assign(config.headers, { 'X-Content-Security': sign });

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


service.interceptors.response.use(
    (response)=> {
        let data = response.data;
        let status = response.status;
        if (status === 200) {
            return Promise.resolve(data);
        } else if (status >= 400 && status <= 499) {
            return Promise.reject(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                router.push("/startPage");
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

let api= {};

api.get = function (url,param) {
    return new Promise((resolve, reject) => {
        service
            .request({
                url: url,
                method: "GET",
                params: param,
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
api.post = function (url, data) {
    return new Promise((resolve, reject) => {
        service
            .post(url, data)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default api;

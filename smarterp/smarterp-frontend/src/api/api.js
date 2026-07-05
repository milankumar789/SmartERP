import axios from "axios";

import {

    API_BASE_URL,

    DEFAULT_TIMEOUT

} from "../utils/constants";

import {

    getToken,

    clearStorage

} from "../utils/storage";

const API = axios.create({

    baseURL: API_BASE_URL,

    timeout: DEFAULT_TIMEOUT,

    headers: {

        "Content-Type": "application/json"

    }

});

API.interceptors.request.use(

    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

API.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            clearStorage();

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

export default API;
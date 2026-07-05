import API from "../api/api";

const AUTH_URL = "/auth";

const authService = {

    async login(credentials) {

        const response = await API.post(

            `${AUTH_URL}/login`,

            credentials

        );

        return response.data;

    },

    async register(user) {

        const response = await API.post(

            `${AUTH_URL}/register`,

            user

        );

        return response.data;

    }

};

export default authService;
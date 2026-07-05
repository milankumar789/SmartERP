import API from "../api/api";

const DASHBOARD_URL = "/dashboard";

const dashboardService = {

    async getSummary() {

        const response = await API.get(

            `${DASHBOARD_URL}/summary`

        );

        return response.data;

    },

    async getLowStockProducts() {

        const response = await API.get(

            `${DASHBOARD_URL}/low-stock`

        );

        return response.data;

    }

};

export default dashboardService;
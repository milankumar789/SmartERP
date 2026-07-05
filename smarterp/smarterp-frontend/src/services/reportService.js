import API from "../api/api";

const REPORT_URL = "/reports";

const reportService = {

    async getDashboardReport() {

        const response = await API.get(

            `${REPORT_URL}/dashboard`

        );

        return response.data;

    },

    async getSalesReport() {

        const response = await API.get(

            `${REPORT_URL}/sales`

        );

        return response.data;

    },

    async getPurchaseReport() {

        const response = await API.get(

            `${REPORT_URL}/purchases`

        );

        return response.data;

    },

    async getInventoryReport() {

        const response = await API.get(

            `${REPORT_URL}/inventory`

        );

        return response.data;

    },

    async getLowStockReport() {

        const response = await API.get(

            `${REPORT_URL}/low-stock`

        );

        return response.data;

    }

};

export default reportService;
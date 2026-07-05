import API from "../api/api";

const SALE_URL = "/sales";

const saleService = {

    async getSales(page = 0, size = 10) {

        const response = await API.get(

            SALE_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async createSale(sale) {

        const response = await API.post(

            SALE_URL,

            sale

        );

        return response.data;

    }

};

export default saleService;
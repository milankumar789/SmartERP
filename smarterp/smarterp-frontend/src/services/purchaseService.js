import API from "../api/api";

const PURCHASE_URL = "/purchases";

const purchaseService = {

    async getPurchases(page = 0, size = 10) {

        const response = await API.get(

            PURCHASE_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async searchPurchases(keyword, page = 0, size = 10) {

        const response = await API.get(

            `${PURCHASE_URL}/search`,

            {

                params: {

                    keyword,

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async createPurchase(purchase) {

        const response = await API.post(

            PURCHASE_URL,

            purchase

        );

        return response.data;

    },

    async getPurchase(id) {

        const response = await API.get(

            `${PURCHASE_URL}/${id}`

        );

        return response.data;

    }

};

export default purchaseService;
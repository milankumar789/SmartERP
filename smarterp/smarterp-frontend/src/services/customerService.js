import API from "../api/api";

const CUSTOMER_URL = "/customers";

const customerService = {

    async getCustomers(

        page = 0,

        size = 10

    ) {

        const response = await API.get(

            CUSTOMER_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async searchCustomers(

        keyword,

        page = 0,

        size = 10

    ) {

        const response = await API.get(

            `${CUSTOMER_URL}/search`,

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

    async getCustomer(id) {

        const response = await API.get(

            `${CUSTOMER_URL}/${id}`

        );

        return response.data;

    },

    async createCustomer(customer) {

        const response = await API.post(

            CUSTOMER_URL,

            customer

        );

        return response.data;

    },

    async updateCustomer(

        id,

        customer

    ) {

        const response = await API.put(

            `${CUSTOMER_URL}/${id}`,

            customer

        );

        return response.data;

    },

    async deactivateCustomer(id) {

        const response = await API.patch(

            `${CUSTOMER_URL}/${id}/deactivate`

        );

        return response.data;

    }

};

export default customerService;
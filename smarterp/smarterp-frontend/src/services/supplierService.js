import API from "../api/api";

const SUPPLIER_URL = "/suppliers";

const supplierService = {

    async getSuppliers(page = 0, size = 10) {

        const response = await API.get(

            SUPPLIER_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async searchSuppliers(keyword, page = 0, size = 10) {

        const response = await API.get(

            `${SUPPLIER_URL}/search`,

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

    async getSupplier(id) {

        const response = await API.get(

            `${SUPPLIER_URL}/${id}`

        );

        return response.data;

    },

    async createSupplier(supplier) {

        const response = await API.post(

            SUPPLIER_URL,

            supplier

        );

        return response.data;

    },

    async updateSupplier(id, supplier) {

        const response = await API.put(

            `${SUPPLIER_URL}/${id}`,

            supplier

        );

        return response.data;

    },

    async deactivateSupplier(id) {

        const response = await API.patch(

            `${SUPPLIER_URL}/${id}/deactivate`

        );

        return response.data;

    }

};

export default supplierService;
import API from "../api/api";

const PRODUCT_URL = "/products";

const productService = {

    async getProducts(page = 0, size = 10) {

        const response = await API.get(

            PRODUCT_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async searchProducts(keyword, page = 0, size = 10) {

        const response = await API.get(

            `${PRODUCT_URL}/search`,

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

    async getProduct(id) {

        const response = await API.get(

            `${PRODUCT_URL}/${id}`

        );

        return response.data;

    },

    async createProduct(product) {

        const response = await API.post(

            PRODUCT_URL,

            product

        );

        return response.data;

    },

    async updateProduct(id, product) {

        const response = await API.put(

            `${PRODUCT_URL}/${id}`,

            product

        );

        return response.data;

    },

    async deactivateProduct(id) {

        const response = await API.patch(

            `${PRODUCT_URL}/${id}/deactivate`

        );

        return response.data;

    }

};

export default productService;
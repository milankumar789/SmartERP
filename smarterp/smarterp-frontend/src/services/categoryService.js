import API from "../api/api";

const CATEGORY_URL = "/categories";

const categoryService = {

    async getCategories(page = 0, size = 10) {

        const response = await API.get(

            CATEGORY_URL,

            {

                params: {

                    page,

                    size

                }

            }

        );

        return response.data;

    },

    async searchCategories(keyword, page = 0, size = 10) {

        const response = await API.get(

            `${CATEGORY_URL}/search`,

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

    async getCategory(id) {

        const response = await API.get(

            `${CATEGORY_URL}/${id}`

        );

        return response.data;

    },

    async createCategory(category) {

        const response = await API.post(

            CATEGORY_URL,

            category

        );

        return response.data;

    },

    async updateCategory(id, category) {

        const response = await API.put(

            `${CATEGORY_URL}/${id}`,

            category

        );

        return response.data;

    },

    async deactivateCategory(id) {

        const response = await API.patch(

            `${CATEGORY_URL}/${id}/deactivate`

        );

        return response.data;

    }

};

export default categoryService;
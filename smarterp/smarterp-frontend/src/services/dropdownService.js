import API from "../api/api";

const dropdownService = {

    async getCategories() {

        const response = await API.get(
            "/categories/dropdown"
        );

        return response.data;

    },

    async getSuppliers() {

        const response = await API.get(
            "/suppliers/dropdown"
        );

        return response.data;

    },

    async getProducts() {

        const response = await API.get(
            "/products/dropdown"
        );

        return response.data;

    },

    async getCustomers() {

        const response = await API.get(
            "/customers/dropdown"
        );

        return response.data;

    }

};

export default dropdownService;
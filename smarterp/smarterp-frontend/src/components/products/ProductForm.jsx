import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import dropdownService from "../../services/dropdownService";

import {

    EMPTY_PRODUCT

} from "../../models/Product";

export default function ProductForm({

    product,

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_PRODUCT

    );

    const [

        categories,

        setCategories

    ] = useState([]);

    const [

        suppliers,

        setSuppliers

    ] = useState([]);

    useEffect(() => {

        setForm(

            product ||

            EMPTY_PRODUCT

        );

    }, [

        product

    ]);

    useEffect(() => {

        async function loadDropdowns() {

            const [

                categoryList,

                supplierList

            ] = await Promise.all([

                dropdownService.getCategories(),

                dropdownService.getSuppliers()

            ]);

            setCategories(categoryList);

            setSuppliers(supplierList);

        }

        loadDropdowns();

    }, []);

    function handleChange(event) {

        setForm({

            ...form,

            [

                event.target.name

            ]: event.target.value

        });

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(form);

    }

    return (

        <form

            className="product-form"

            onSubmit={handleSubmit}

        >

            <Input

                label="Product Name"

                name="name"

                value={form.name}

                onChange={handleChange}

                required

                autoFocus

            />

            <div className="erp-form-group">

                <label>

                    Category

                </label>

                <select

                    className="erp-select"

                    name="categoryId"

                    value={form.categoryId}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Category

                    </option>

                    {

                        categories.map(category => (

                            <option

                                key={category.id}

                                value={category.id}

                            >

                                {category.name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="erp-form-group">

                <label>

                    Supplier

                </label>

                <select

                    className="erp-select"

                    name="supplierId"

                    value={form.supplierId}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Supplier

                    </option>

                    {

                        suppliers.map(supplier => (

                            <option

                                key={supplier.id}

                                value={supplier.id}

                            >

                                {supplier.name}

                            </option>

                        ))

                    }

                </select>

            </div>

            <Input

                label="Purchase Price"

                name="purchasePrice"

                type="number"

                value={form.purchasePrice}

                onChange={handleChange}

            />

            <Input

                label="Selling Price"

                name="sellingPrice"

                type="number"

                value={form.sellingPrice}

                onChange={handleChange}

            />

            <Input

                label="Quantity"

                name="quantity"

                type="number"

                value={form.quantity}

                onChange={handleChange}

            />

            <Input

                label="Minimum Stock"

                name="minimumStock"

                type="number"

                value={form.minimumStock}

                onChange={handleChange}

            />

            <div className="erp-form-group">

                <label>

                    Description

                </label>

                <textarea

                    className="erp-textarea"

                    rows="4"

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                />

            </div>

            <div className="product-form-buttons">

                <Button type="submit">

                    Save

                </Button>

                <Button

                    type="button"

                    variant="secondary"

                    onClick={onCancel}

                >

                    Cancel

                </Button>

            </div>

        </form>

    );

}
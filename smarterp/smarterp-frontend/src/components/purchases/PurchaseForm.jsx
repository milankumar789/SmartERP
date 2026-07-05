import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import dropdownService from "../../services/dropdownService";

import {

    EMPTY_PURCHASE

} from "../../models/Purchase";

export default function PurchaseForm({

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_PURCHASE

    );

    const [

        suppliers,

        setSuppliers

    ] = useState([]);

    const [

        products,

        setProducts

    ] = useState([]);

    useEffect(() => {

        async function loadDropdowns() {

            const [

                supplierList,

                productList

            ] = await Promise.all([

                dropdownService.getSuppliers(),

                dropdownService.getProducts()

            ]);

            setSuppliers(supplierList);

            setProducts(productList);

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

        onSubmit({

            ...form,

            supplierId: Number(form.supplierId),

            productId: Number(form.productId),

            quantity: Number(form.quantity),

            purchasePrice: Number(form.purchasePrice)

        });

    }

    return (

        <form

            className="purchase-form"

            onSubmit={handleSubmit}

        >

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

                        suppliers.map(

                            supplier => (

                                <option

                                    key={supplier.id}

                                    value={supplier.id}

                                >

                                    {supplier.name}

                                </option>

                            )

                        )

                    }

                </select>

            </div>

            <div className="erp-form-group">

                <label>

                    Product

                </label>

                <select

                    className="erp-select"

                    name="productId"

                    value={form.productId}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Product

                    </option>

                    {

                        products.map(

                            product => (

                                <option

                                    key={product.id}

                                    value={product.id}

                                >

                                    {product.name}

                                </option>

                            )

                        )

                    }

                </select>

            </div>

            <Input

                label="Quantity"

                name="quantity"

                type="number"

                value={form.quantity}

                onChange={handleChange}

                required

            />

            <Input

                label="Purchase Price"

                name="purchasePrice"

                type="number"

                value={form.purchasePrice}

                onChange={handleChange}

                required

            />

            <Input

                label="Purchase Date"

                name="purchaseDate"

                type="date"

                value={form.purchaseDate}

                onChange={handleChange}

                required

            />

            <div className="purchase-form-buttons">

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
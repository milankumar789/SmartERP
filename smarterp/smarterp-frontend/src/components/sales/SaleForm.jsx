import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import dropdownService from "../../services/dropdownService";

import {

    EMPTY_SALE

} from "../../models/Sale";

export default function SaleForm({

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_SALE

    );

    const [

        customers,

        setCustomers

    ] = useState([]);

    const [

        products,

        setProducts

    ] = useState([]);

    useEffect(() => {

        async function loadData() {

            const [

                customerList,

                productList

            ] = await Promise.all([

                dropdownService.getCustomers(),

                dropdownService.getProducts()

            ]);

            setCustomers(customerList);

            setProducts(productList);

        }

        loadData();

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

            customerId: Number(form.customerId),

            productId: Number(form.productId),

            quantity: Number(form.quantity)

        });

    }

    return (

        <form

            className="sale-form"

            onSubmit={handleSubmit}

        >

            <div className="erp-form-group">

                <label>

                    Customer

                </label>

                <select

                    className="erp-select"

                    name="customerId"

                    value={form.customerId}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Customer

                    </option>

                    {

                        customers.map(customer => (

                            <option

                                key={customer.id}

                                value={customer.id}

                            >

                                {customer.name}

                            </option>

                        ))

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

                        products.map(product => (

                            <option

                                key={product.id}

                                value={product.id}

                            >

                                {product.name}

                            </option>

                        ))

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

                label="Sale Date"

                name="saleDate"

                type="date"

                value={form.saleDate}

                onChange={handleChange}

                required

            />

            <div className="sale-form-buttons">

                <Button

                    type="submit"

                >

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
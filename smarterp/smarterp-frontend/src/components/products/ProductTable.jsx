import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function ProductTable({

    products,

    onEdit,

    onDeactivate

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: products,

        onEnter: onEdit,

        onDelete: onDeactivate

    });

    if (

        products.length === 0

    ) {

        return (

            <EmptyState

                title="No Products"

                message="Product records will appear here."

            />

        );

    }

    return (

        <div

            ref={tableRef}

            tabIndex={0}

            className="erp-table-container"

            onKeyDown={handleKeyDown}

        >

            <table className="erp-table">

                <thead>

                    <tr>

                        <th>

                            Code

                        </th>

                        <th>

                            Name

                        </th>

                        <th>

                            Category

                        </th>

                        <th>

                            Supplier

                        </th>

                        <th>

                            Qty

                        </th>

                        <th>

                            Selling Price

                        </th>

                        <th>

                            Status

                        </th>

                        <th>

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        products.map(

                            (

                                product,

                                index

                            ) => (

                                <tr

                                    key={product.id}

                                    data-row-index={index}

                                    className={

                                        index === selectedIndex

                                            ? "table-row-selected"

                                            : ""

                                    }

                                    onClick={() =>

                                        setSelectedIndex(

                                            index

                                        )

                                    }

                                    onDoubleClick={() =>

                                        onEdit(

                                            product

                                        )

                                    }

                                >

                                    <td>

                                        {product.productCode}

                                    </td>

                                    <td>

                                        {product.name}

                                    </td>

                                    <td>

                                        {product.categoryName}

                                    </td>

                                    <td>

                                        {product.supplierName}

                                    </td>

                                    <td>

                                        {product.quantity}

                                    </td>

                                    <td>

                                        ₹ {product.sellingPrice}

                                    </td>

                                    <td>

                                        {

                                            product.active

                                                ? "Active"

                                                : "Inactive"

                                        }

                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <button

                                                type="button"

                                                className="table-link"

                                                onClick={() =>

                                                    onEdit(

                                                        product

                                                    )

                                                }

                                            >

                                                Edit

                                            </button>

                                            <button

                                                type="button"

                                                className="table-link table-danger"

                                                onClick={() =>

                                                    onDeactivate(

                                                        product

                                                    )

                                                }

                                            >

                                                Deactivate

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}
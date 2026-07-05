import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function SaleTable({

    sales

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: sales

    });

    if (

        sales.length === 0

    ) {

        return (

            <EmptyState

                title="No Sales"

                message="Sales history will appear here."

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

                            Date

                        </th>

                        <th>

                            Customer

                        </th>

                        <th>

                            Product

                        </th>

                        <th>

                            Quantity

                        </th>

                        <th>

                            Price

                        </th>

                        <th>

                            Total

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        sales.map(

                            (

                                sale,

                                index

                            ) => (

                                <tr

                                    key={sale.id}

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

                                >

                                    <td>

                                        {sale.saleCode}

                                    </td>

                                    <td>

                                        {sale.saleDate}

                                    </td>

                                    <td>

                                        {sale.customerName}

                                    </td>

                                    <td>

                                        {sale.productName}

                                    </td>

                                    <td>

                                        {sale.quantity}

                                    </td>

                                    <td>

                                        ₹ {sale.sellingPrice}

                                    </td>

                                    <td>

                                        ₹ {sale.totalAmount}

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
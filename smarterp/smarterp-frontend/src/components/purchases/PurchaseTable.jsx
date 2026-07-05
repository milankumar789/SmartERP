import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function PurchaseTable({

    purchases

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: purchases

    });

    if (

        purchases.length === 0

    ) {

        return (

            <EmptyState

                title="No Purchases"

                message="Purchase records will appear here."

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

                            Supplier

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

                            Date

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        purchases.map(

                            (

                                purchase,

                                index

                            ) => (

                                <tr

                                    key={purchase.id}

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

                                        {purchase.supplierName}

                                    </td>

                                    <td>

                                        {purchase.productName}

                                    </td>

                                    <td>

                                        {purchase.quantity}

                                    </td>

                                    <td>

                                        ₹ {purchase.purchasePrice}

                                    </td>

                                    <td>

                                        {purchase.purchaseDate}

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
import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function CustomerTable({

    customers,

    onEdit,

    onDeactivate

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: customers,

        onEnter: onEdit,

        onDelete: onDeactivate

    });

    if (

        customers.length === 0

    ) {

        return (

            <EmptyState

                title="No Customers"

                message="Customer records will appear here."

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

                            Email

                        </th>

                        <th>

                            Phone

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

                        customers.map(

                            (

                                customer,

                                index

                            ) => (

                                <tr

                                    key={customer.id}

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

                                            customer

                                        )

                                    }

                                >

                                    <td>

                                        {customer.customerCode}

                                    </td>

                                    <td>

                                        {customer.name}

                                    </td>

                                    <td>

                                        {customer.email}

                                    </td>

                                    <td>

                                        {customer.phone}

                                    </td>

                                    <td>

                                        {

                                            customer.active

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

                                                        customer

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

                                                        customer

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
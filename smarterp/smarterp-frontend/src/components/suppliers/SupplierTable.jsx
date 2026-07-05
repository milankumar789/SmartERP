import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function SupplierTable({

    suppliers,

    onEdit,

    onDeactivate

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: suppliers,

        onEnter: onEdit,

        onDelete: onDeactivate

    });

    if (

        suppliers.length === 0

    ) {

        return (

            <EmptyState

                title="No Suppliers"

                message="Supplier records will appear here."

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

                        suppliers.map(

                            (

                                supplier,

                                index

                            ) => (

                                <tr

                                    key={supplier.id}

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

                                            supplier

                                        )

                                    }

                                >

                                    <td>

                                        {supplier.supplierCode}

                                    </td>

                                    <td>

                                        {supplier.name}

                                    </td>

                                    <td>

                                        {supplier.email}

                                    </td>

                                    <td>

                                        {supplier.phone}

                                    </td>

                                    <td>

                                        {

                                            supplier.active

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

                                                        supplier

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

                                                        supplier

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
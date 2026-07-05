import EmptyState from "../common/EmptyState";

import useTableKeyboard from "../../hooks/useTableKeyboard";

export default function CategoryTable({

    categories,

    onEdit,

    onDeactivate

}) {

    const {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    } = useTableKeyboard({

        rows: categories,

        onEnter: onEdit,

        onDelete: onDeactivate

    });

    if (

        categories.length === 0

    ) {

        return (

            <EmptyState

                title="No Categories"

                message="Category records will appear here."

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

                            Description

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

                        categories.map(

                            (

                                category,

                                index

                            ) => (

                                <tr

                                    key={category.id}

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

                                            category

                                        )

                                    }

                                >

                                    <td>

                                        {category.categoryCode}

                                    </td>

                                    <td>

                                        {category.name}

                                    </td>

                                    <td>

                                        {

                                            category.description ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            category.active

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

                                                        category

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

                                                        category

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
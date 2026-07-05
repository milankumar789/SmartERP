export default function LowStockReport({

    products

}) {

    return (

        <table className="report-table">

            <thead>

                <tr>

                    <th>

                        Code

                    </th>

                    <th>

                        Product

                    </th>

                    <th>

                        Quantity

                    </th>

                    <th>

                        Minimum

                    </th>

                </tr>

            </thead>

            <tbody>

                {

                    products.map(product => (

                        <tr

                            key={product.productId}

                        >

                            <td>

                                {product.productCode}

                            </td>

                            <td>

                                {product.productName}

                            </td>

                            <td>

                                {product.quantity}

                            </td>

                            <td>

                                {product.minimumStock}

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}
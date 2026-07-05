import {

    useCallback,

    useEffect,

    useState

} from "react";

import MainLayout from "../../components/layout/MainLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import SummaryCard from "../../components/dashboard/SummaryCard";

import dashboardService from "../../services/dashboardService";

import {

    EMPTY_DASHBOARD,

    EMPTY_LOW_STOCK

} from "../../models/Dashboard";

import "../../styles/dashboard.css";

export default function DashboardPage() {

    const [

        summary,

        setSummary

    ] = useState(

        EMPTY_DASHBOARD

    );

    const [

        lowStock,

        setLowStock

    ] = useState(

        EMPTY_LOW_STOCK

    );

    const [

        loading,

        setLoading

    ] = useState(true);

    const loadDashboard = useCallback(

        async () => {

            try {

                setLoading(true);

                const [

                    summaryData,

                    lowStockData

                ] = await Promise.all([

                    dashboardService.getSummary(),

                    dashboardService.getLowStockProducts()

                ]);

                setSummary(summaryData);

                setLowStock(lowStockData);

            }

            finally {

                setLoading(false);

            }

        },

        []

    );

    useEffect(() => {

        loadDashboard();

    }, [

        loadDashboard

    ]);

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading Dashboard..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="dashboard">

                <PageHeader

                    title="Dashboard"

                    subtitle="Business Overview"

                />

                <section className="summary-grid">

                    <SummaryCard title="Customers" value={summary.totalCustomers} />

                    <SummaryCard title="Suppliers" value={summary.totalSuppliers} />

                    <SummaryCard title="Products" value={summary.totalProducts} />

                    <SummaryCard title="Sales" value={summary.totalSales} />

                    <SummaryCard title="Purchases" value={summary.totalPurchases} />

                    <SummaryCard title="Categories" value={summary.totalCategories} />

                    <SummaryCard title="Low Stock" value={summary.lowStockProducts} />

                    <SummaryCard title="Profit" value={summary.estimatedProfit} />

                </section>

                <section className="dashboard-row">

                    <div className="dashboard-panel">

                        <h2>

                            Low Stock Products

                        </h2>

                        <table className="low-stock-table">

                            <thead>

                                <tr>

                                    <th>Code</th>

                                    <th>Name</th>

                                    <th>Qty</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    lowStock.map(product => (

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

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                    <div className="dashboard-panel">

                        <h2>

                            Financial Summary

                        </h2>

                        <p>

                            Purchase Amount

                        </p>

                        <h3>

                            ₹ {summary.purchaseAmount}

                        </h3>

                        <br/>

                        <p>

                            Sales Amount

                        </p>

                        <h3>

                            ₹ {summary.salesAmount}

                        </h3>

                        <br/>

                        <p>

                            Inventory Value

                        </p>

                        <h3>

                            ₹ {summary.inventoryValue}

                        </h3>

                    </div>

                </section>

            </div>

        </MainLayout>

    );

}
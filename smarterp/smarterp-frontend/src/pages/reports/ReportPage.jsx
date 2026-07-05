import {

    useCallback,

    useEffect,

    useState

} from "react";

import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import DashboardReport from "../../components/reports/DashboardReport";

import SalesReport from "../../components/reports/SalesReport";

import PurchaseReport from "../../components/reports/PurchaseReport";

import InventoryReport from "../../components/reports/InventoryReport";

import LowStockReport from "../../components/reports/LowStockReport";

import reportService from "../../services/reportService";

import {

    EMPTY_DASHBOARD_REPORT,

    EMPTY_SALES_REPORT,

    EMPTY_PURCHASE_REPORT,

    EMPTY_INVENTORY_REPORT

} from "../../models/Report";

import "../../styles/reports.css";

export default function ReportsPage() {

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        dashboard,

        setDashboard

    ] = useState(

        EMPTY_DASHBOARD_REPORT

    );

    const [

        sales,

        setSales

    ] = useState(

        EMPTY_SALES_REPORT

    );

    const [

        purchases,

        setPurchases

    ] = useState(

        EMPTY_PURCHASE_REPORT

    );

    const [

        inventory,

        setInventory

    ] = useState(

        EMPTY_INVENTORY_REPORT

    );

    const [

        lowStock,

        setLowStock

    ] = useState([]);
    const loadReports = useCallback(

        async () => {

            try {

                setLoading(true);

                const [

                    dashboardData,

                    salesData,

                    purchaseData,

                    inventoryData,

                    lowStockData

                ] = await Promise.all([

                    reportService.getDashboardReport(),

                    reportService.getSalesReport(),

                    reportService.getPurchaseReport(),

                    reportService.getInventoryReport(),

                    reportService.getLowStockReport()

                ]);

                setDashboard(dashboardData);

                setSales(salesData);

                setPurchases(purchaseData);

                setInventory(inventoryData);

                setLowStock(lowStockData);

            }

            // eslint-disable-next-line no-unused-vars
            catch (error) {

                toast.error(

                    "Unable to load reports."

                );

            }

            finally {

                setLoading(false);

            }

        },

        []

    );

    useEffect(() => {

        loadReports();

    }, [

        loadReports

    ]);

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading reports..."

                />

            </MainLayout>

        );

    }
        return (

        <MainLayout>

            <div className="reports-page">

                <PageHeader

                    title="Reports"

                    subtitle="Business Analytics"

                />

                <div className="report-section">

                    <DashboardReport

                        report={dashboard}

                    />

                </div>

                <div className="report-section">

                    <SalesReport

                        report={sales}

                    />

                </div>

                <div className="report-section">

                    <PurchaseReport

                        report={purchases}

                    />

                </div>

                <div className="report-section">

                    <InventoryReport

                        report={inventory}

                    />

                </div>

                <div className="report-section">

                    <h2>

                        Low Stock Products

                    </h2>

                    <LowStockReport

                        products={lowStock}

                    />

                </div>

            </div>

        </MainLayout>

    );

}
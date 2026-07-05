import ReportCard from "./ReportCard";

export default function DashboardReport({

    report

}) {

    return (

        <div className="report-grid">

            <ReportCard

                title="Customers"

                value={report.totalCustomers}

            />

            <ReportCard

                title="Suppliers"

                value={report.totalSuppliers}

            />

            <ReportCard

                title="Products"

                value={report.totalProducts}

            />

            <ReportCard

                title="Categories"

                value={report.totalCategories}

            />

            <ReportCard

                title="Sales"

                value={report.totalSales}

            />

            <ReportCard

                title="Purchases"

                value={report.totalPurchases}

            />

            <ReportCard

                title="Low Stock"

                value={report.lowStockProducts}

            />

            <ReportCard

                title="Estimated Profit"

                value={`₹ ${report.estimatedProfit}`}

            />

        </div>

    );

}
import ReportCard from "./ReportCard";

export default function SalesReport({

    report

}) {

    return (

        <div className="report-grid">

            <ReportCard

                title="Invoices"

                value={report.totalInvoices}

            />

            <ReportCard

                title="Products Sold"

                value={report.totalProductsSold}

            />

            <ReportCard

                title="Sales Amount"

                value={`₹ ${report.totalSalesAmount}`}

            />

            <ReportCard

                title="Average Sale"

                value={`₹ ${report.averageSaleValue}`}

            />

        </div>

    );

}
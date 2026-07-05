import ReportCard from "./ReportCard";

export default function InventoryReport({

    report

}) {

    return (

        <div className="report-grid">

            <ReportCard

                title="Products"

                value={report.totalProducts}

            />

            <ReportCard

                title="Total Stock"

                value={report.totalStock}

            />

            <ReportCard

                title="Inventory Value"

                value={`₹ ${report.inventoryValue}`}

            />

            <ReportCard

                title="Low Stock"

                value={report.lowStockProducts}

            />

        </div>

    );

}
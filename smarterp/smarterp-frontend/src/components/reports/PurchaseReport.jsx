import ReportCard from "./ReportCard";

export default function PurchaseReport({

    report

}) {

    return (

        <div className="report-grid">

            <ReportCard

                title="Purchases"

                value={report.totalPurchases}

            />

            <ReportCard

                title="Items Purchased"

                value={report.totalItemsPurchased}

            />

            <ReportCard

                title="Purchase Amount"

                value={`₹ ${report.totalPurchaseAmount}`}

            />

            <ReportCard

                title="Average Purchase"

                value={`₹ ${report.averagePurchaseValue}`}

            />

        </div>

    );

}
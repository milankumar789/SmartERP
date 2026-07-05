import "../../styles/dashboard.css";

export default function SummaryCard({

    title,

    value

}) {

    return (

        <div

            className="summary-card"

            tabIndex={0}

        >

            <div className="summary-card-title">

                {title}

            </div>

            <div className="summary-card-value">

                {value}

            </div>

        </div>

    );

}
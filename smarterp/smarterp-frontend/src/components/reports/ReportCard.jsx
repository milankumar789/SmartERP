export default function ReportCard({

    title,

    value

}) {

    return (

        <div className="report-card">

            <h3>

                {title}

            </h3>

            <h2>

                {value}

            </h2>

        </div>

    );

}
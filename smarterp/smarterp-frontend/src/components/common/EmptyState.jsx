export default function EmptyState({

    title = "No Records Found",

    message = "There is no data available."

}) {

    return (

        <div className="erp-empty-state">

            <h3>

                {title}

            </h3>

            <p>

                {message}

            </p>

        </div>

    );

}
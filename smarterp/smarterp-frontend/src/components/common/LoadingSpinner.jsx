export default function LoadingSpinner({

    text = "Loading..."

}) {

    return (

        <div className="loading-container">

            <div className="loading-spinner"></div>

            <div>

                {text}

            </div>

        </div>

    );

}
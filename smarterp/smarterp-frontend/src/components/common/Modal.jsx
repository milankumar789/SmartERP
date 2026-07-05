export default function Modal({

    open,

    title,

    children,

    onClose

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="erp-modal-overlay">

            <div className="erp-modal">

                <div className="erp-modal-header">

                    <h2>

                        {title}

                    </h2>

                    <button

                        type="button"

                        className="erp-modal-close"

                        onClick={onClose}

                    >

                        Close

                    </button>

                </div>

                <div className="erp-modal-body">

                    {children}

                </div>

            </div>

        </div>

    );

}
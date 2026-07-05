import Modal from "./Modal";

import Button from "./Button";

export default function ConfirmDialog({

    open,

    title,

    message,

    onConfirm,

    onCancel

}) {

    return (

        <Modal

            open={open}

            title={title}

            onClose={onCancel}

        >

            <div className="erp-confirm">

                <p>

                    {message}

                </p>

                <div className="erp-confirm-actions">

                    <Button

                        variant="danger"

                        onClick={onConfirm}

                    >

                        Yes

                    </Button>

                    <Button

                        variant="secondary"

                        onClick={onCancel}

                    >

                        No

                    </Button>

                </div>

            </div>

        </Modal>

    );

}
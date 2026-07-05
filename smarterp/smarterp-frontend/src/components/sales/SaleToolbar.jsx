import Button from "../common/Button";

export default function SaleToolbar({

    onNewSale

}) {

    return (

        <div className="sale-toolbar">

            <div />

            <Button

                onClick={onNewSale}

            >

                New Sale

            </Button>

        </div>

    );

}
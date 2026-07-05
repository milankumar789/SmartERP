import Button from "./Button";

export default function Pagination({

    page,

    totalPages,

    onPrevious,

    onNext

}) {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <div className="erp-pagination">

            <Button

                variant="secondary"

                disabled={page === 0}

                onClick={onPrevious}

            >

                Previous

            </Button>

            <span>

                Page {page + 1} of {totalPages}

            </span>

            <Button

                variant="secondary"

                disabled={page >= totalPages - 1}

                onClick={onNext}

            >

                Next

            </Button>

        </div>

    );

}
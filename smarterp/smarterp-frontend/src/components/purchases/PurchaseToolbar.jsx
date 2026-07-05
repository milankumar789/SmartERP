import SearchBox from "../common/SearchBox";

import Button from "../common/Button";

export default function PurchaseToolbar({

    keyword,

    onKeywordChange,

    onSearch,

    onNewPurchase,

    searchRef

}) {

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            onSearch();

        }

    }

    return (

        <div className="purchase-toolbar">

            <SearchBox

                value={keyword}

                inputRef={searchRef}

                placeholder="Search purchases..."

                onChange={onKeywordChange}

                onKeyDown={handleKeyDown}

            />

            <div className="customer-toolbar-actions">

                <Button

                    variant="secondary"

                    onClick={onSearch}

                >

                    Search

                </Button>

                <Button

                    onClick={onNewPurchase}

                >

                    New Purchase

                </Button>

            </div>

        </div>

    );

}
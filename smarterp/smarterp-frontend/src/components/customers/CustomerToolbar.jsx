import SearchBox from "../common/SearchBox";

import Button from "../common/Button";

export default function CustomerToolbar({

    keyword,

    onKeywordChange,

    onSearch,

    onNewCustomer,

    searchRef

}) {

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            onSearch();

        }

    }

    return (

        <div className="customer-toolbar">

            <SearchBox

                value={keyword}

                inputRef={searchRef}

                placeholder="Search by customer name..."

                onChange={onKeywordChange}

                onKeyDown={handleKeyDown}

            />

            <div className="customer-toolbar-actions">

                <Button

                    type="button"

                    variant="secondary"

                    onClick={onSearch}

                >

                    Search

                </Button>

                <Button

                    type="button"

                    onClick={onNewCustomer}

                >

                    New Customer

                </Button>

            </div>

        </div>

    );

}
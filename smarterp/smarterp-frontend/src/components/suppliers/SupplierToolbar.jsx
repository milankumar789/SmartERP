import SearchBox from "../common/SearchBox";

import Button from "../common/Button";

export default function SupplierToolbar({

    keyword,

    onKeywordChange,

    onSearch,

    onNewSupplier,

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

                placeholder="Search suppliers..."

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

                    onClick={onNewSupplier}

                >

                    New Supplier

                </Button>

            </div>

        </div>

    );

}
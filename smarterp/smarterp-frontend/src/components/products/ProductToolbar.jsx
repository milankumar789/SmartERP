import SearchBox from "../common/SearchBox";
import Button from "../common/Button";

export default function ProductToolbar({

    keyword,

    onKeywordChange,

    onSearch,

    onNewProduct,

    searchRef

}) {

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            onSearch();

        }

    }

    return (

        <div className="product-toolbar">

            <SearchBox

                value={keyword}

                inputRef={searchRef}

                placeholder="Search products..."

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

                    onClick={onNewProduct}

                >

                    New Product

                </Button>

            </div>

        </div>

    );

}
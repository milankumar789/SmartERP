import SearchBox from "../common/SearchBox";

import Button from "../common/Button";

export default function CategoryToolbar({

    keyword,

    onKeywordChange,

    onSearch,

    onNewCategory,

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

                placeholder="Search categories..."

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

                    onClick={onNewCategory}

                >

                    New Category

                </Button>

            </div>

        </div>

    );

}
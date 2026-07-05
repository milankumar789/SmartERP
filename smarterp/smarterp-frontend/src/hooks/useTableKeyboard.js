import {

    useEffect,

    useRef,

    useState

} from "react";

export default function useTableKeyboard({

    rows = [],

    onEnter,

    onDelete,

    onInsert,

    pageSize = 10

}) {

    const [

        selectedIndex,

        setSelectedIndex

    ] = useState(0);

    const tableRef = useRef(null);

    useEffect(() => {

        tableRef.current?.focus();

    }, []);

    useEffect(() => {

        if (rows.length === 0) {

            setSelectedIndex(0);

            return;

        }

        if (selectedIndex >= rows.length) {

            setSelectedIndex(rows.length - 1);

        }

    }, [

        rows,

        selectedIndex

    ]);

    useEffect(() => {

        const row = tableRef.current?.querySelector(

            `[data-row-index="${selectedIndex}"]`

        );

        row?.scrollIntoView({

            block: "nearest",

            behavior: "smooth"

        });

    }, [

        selectedIndex

    ]);

    function moveSelection(step) {

        setSelectedIndex(previous =>

            Math.max(

                0,

                Math.min(

                    previous + step,

                    rows.length - 1

                )

            )

        );

    }

    function handleKeyDown(event) {

        if (rows.length === 0) {

            return;

        }

        switch (event.key) {

            case "ArrowDown":

                event.preventDefault();

                moveSelection(1);

                break;

            case "ArrowUp":

                event.preventDefault();

                moveSelection(-1);

                break;

            case "PageDown":

                event.preventDefault();

                moveSelection(pageSize);

                break;

            case "PageUp":

                event.preventDefault();

                moveSelection(-pageSize);

                break;

            case "Home":

                event.preventDefault();

                setSelectedIndex(0);

                break;

            case "End":

                event.preventDefault();

                setSelectedIndex(

                    rows.length - 1

                );

                break;

            case "Enter":

                event.preventDefault();

                onEnter?.(

                    rows[selectedIndex]

                );

                break;

            case "F2":

                event.preventDefault();

                onEnter?.(

                    rows[selectedIndex]

                );

                break;

            case "Delete":

                event.preventDefault();

                onDelete?.(

                    rows[selectedIndex]

                );

                break;

            case "Insert":

                event.preventDefault();

                onInsert?.();

                break;

            case "Escape":

                event.preventDefault();

                setSelectedIndex(0);

                break;

            default:

                break;

        }

    }

    return {

        tableRef,

        selectedIndex,

        setSelectedIndex,

        handleKeyDown

    };

}
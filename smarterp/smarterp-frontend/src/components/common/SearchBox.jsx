export default function SearchBox({

    value,

    onChange,

    placeholder,

    inputRef,

    onKeyDown

}) {

    return (

        <input

            ref={inputRef}

            className="erp-search"

            type="text"

            value={value}

            onChange={onChange}

            onKeyDown={onKeyDown}

            placeholder={placeholder}

        />

    );

}
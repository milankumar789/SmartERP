export default function Input({

    id,

    label,

    name,

    type = "text",

    value,

    onChange,

    placeholder = "",

    required = false,

    disabled = false,

    autoFocus = false,

    onKeyDown

}) {

    return (

        <div className="erp-form-group">

            {

                label && (

                    <label htmlFor={id}>

                        {label}

                    </label>

                )

            }

            <input

                id={id}

                className="erp-input"

                name={name}

                type={type}

                value={value}

                placeholder={placeholder}

                required={required}

                disabled={disabled}

                autoFocus={autoFocus}

                onChange={onChange}

                onKeyDown={onKeyDown}

            />

        </div>

    );

}
export default function Button({

    children,

    type = "button",

    variant = "primary",

    disabled = false,

    onClick,

    className = ""

}) {

    const classes = [

        "erp-button",

        `erp-button-${variant}`,

        className

    ].join(" ");

    return (

        <button

            type={type}

            disabled={disabled}

            onClick={onClick}

            className={classes}

        >

            {children}

        </button>

    );

}
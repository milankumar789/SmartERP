const keyboardShortcuts = [

    {

        key: "d",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/dashboard"

    },

    {

        key: "c",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/customers"

    },

    {

        key: "u",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/suppliers"

    },

    {

        key: "g",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/categories"

    },

    {

        key: "p",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/products"

    },

    {

        key: "b",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/purchases"

    },

    {

        key: "s",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/sales"

    },

    {

        key: "r",

        ctrl: false,

        alt: true,

        shift: false,

        path: "/reports"

    }

];

export default keyboardShortcuts;

export function isShortcut(event, shortcut) {

    return (

        event.ctrlKey === shortcut.ctrl &&

        event.altKey === shortcut.alt &&

        event.shiftKey === shortcut.shift &&

        event.key.toLowerCase() === shortcut.key.toLowerCase()

    );

}

export function isAltShortcut(event, key) {

    return (

        event.altKey &&

        event.key.toLowerCase() === key.toLowerCase()

    );

}

export function focusElement(id) {

    const element = document.getElementById(id);

    if (element) {

        element.focus();

    }

}

export function stopBrowserRefresh(event) {

    if (

        event.ctrlKey &&

        event.key.toLowerCase() === "r"

    ) {

        event.preventDefault();

    }

}
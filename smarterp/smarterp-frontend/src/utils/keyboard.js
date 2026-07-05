export function isShortcut(

    event,

    key

) {

    return event.ctrlKey &&

        event.key.toLowerCase() ===

        key.toLowerCase();

}

export function isAltShortcut(

    event,

    key

) {

    return event.altKey &&

        event.key.toLowerCase() ===

        key.toLowerCase();

}

export function focusElement(id) {

    const element =

        document.getElementById(id);

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
import {

    useEffect

} from "react";

import {

    useNavigate

} from "react-router-dom";

import keyboardShortcuts, {

    isShortcut,

    stopBrowserRefresh

} from "../config/keyboardShortcuts";

export default function useKeyboardShortcuts() {

    const navigate = useNavigate();

    useEffect(() => {

        function handleKeyDown(event) {

            stopBrowserRefresh(event);

            const target = event.target;

            if (

                target.tagName === "INPUT" ||

                target.tagName === "TEXTAREA" ||

                target.tagName === "SELECT" ||

                target.isContentEditable

            ) {

                return;

            }

            const shortcut = keyboardShortcuts.find(

                item => isShortcut(event, item)

            );

            if (!shortcut) {

                return;

            }

            event.preventDefault();

            navigate(shortcut.path);

        }

        window.addEventListener(

            "keydown",

            handleKeyDown

        );

        return () => {

            window.removeEventListener(

                "keydown",

                handleKeyDown

            );

        };

    }, [

        navigate

    ]);

}
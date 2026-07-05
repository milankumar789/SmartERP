import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

import StatusBar from "./StatusBar";

import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

import "../../styles/layout.css";

export default function MainLayout({

    children

}) {

    useKeyboardShortcuts();

    return (

        <div className="app">

            <Sidebar />

            <div className="main">

                <Topbar />

                <main className="content">

                    {children}

                </main>

                <StatusBar />

            </div>

        </div>

    );

}
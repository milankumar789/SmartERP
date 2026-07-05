import React from "react";

import ReactDOM from "react-dom/client";

import {

    BrowserRouter

} from "react-router-dom";

import {

    Toaster

} from "react-hot-toast";

import App from "./App";

import AuthProvider from "./context/AuthProvider";

import "./styles/theme.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/common.css";
import "./styles/sidebar.css";
import "./styles/topbar.css";
import "./styles/statusbar.css";
import "./styles/table.css";
import "./styles/login.css";

ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <App />

                <Toaster

                    position="top-right"

                />

            </AuthProvider>

        </BrowserRouter>

    </React.StrictMode>

);
import {

    useLocation,

    useNavigate

} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

import "../../styles/topbar.css";

export default function Topbar() {

    const location = useLocation();

    const navigate = useNavigate();

    const {

        user,

        logout

    } = useAuth();

    const pageTitle =

        location.pathname

            .replace("/", "")

            .replace("-", " ")

            .replace(/\b\w/g, c => c.toUpperCase()) ||

        "Dashboard";

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <header className="topbar">

            <div className="topbar-title">

                <h2>

                    {pageTitle}

                </h2>

                <p>

                    SmartERP Business Management System

                </p>

            </div>

            <div className="topbar-right">

                <div>

                    {user?.email}

                </div>

                <button

                    className="logout-button"

                    onClick={handleLogout}

                >

                    Logout

                </button>

            </div>

        </header>

    );

}
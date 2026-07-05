import {

    NavLink

} from "react-router-dom";

import features from "../../config/features";

import "../../styles/sidebar.css";

export default function Sidebar() {

    const menuItems = [...features]

        .filter(feature => feature.showInSidebar)

        .sort((a, b) => a.order - b.order);

    return (

        <aside className="sidebar">

            <div className="sidebar-header">

                SmartERP

            </div>

            <nav className="sidebar-menu">

                {

                    menuItems.map((feature) => (

                        <NavLink

                            key={feature.id}

                            to={feature.path}

                            className={({ isActive }) =>

                                isActive

                                    ? "sidebar-link active"

                                    : "sidebar-link"

                            }

                        >

                            <span>

                                {feature.title}

                            </span>

                            <span>

                                {feature.shortcut}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            <div className="sidebar-footer">

                Keyboard First ERP

            </div>

        </aside>

    );

}
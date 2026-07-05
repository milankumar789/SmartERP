import {

    Navigate,

    Route,

    Routes

} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import CustomerPage from "../pages/customers/CustomerPage";
import SupplierPage from "../pages/suppliers/SupplierPage";
import CategoryPage from "../pages/categories/CategoryPage";
import ProductPage from "../pages/products/ProductPage";
import PurchasePage from "../pages/purchases/PurchasePage";
import SalesPage from "../pages/sales/SalesPage";
import ReportPage from "../pages/reports/ReportPage";

export default function AppRoutes() {

    return (

        <Routes>

            <Route

                path="/"

                element={

                    <Navigate

                        to="/login"

                        replace

                    />

                }

            />

            <Route

                path="/login"

                element={<LoginPage />}

            />

            <Route

                path="/register"

                element={<RegisterPage />}

            />

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <DashboardPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/customers"

                element={

                    <ProtectedRoute>

                        <CustomerPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/suppliers"

                element={

                    <ProtectedRoute>

                        <SupplierPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/categories"

                element={

                    <ProtectedRoute>

                        <CategoryPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/products"

                element={

                    <ProtectedRoute>

                        <ProductPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/purchases"

                element={

                    <ProtectedRoute>

                        <PurchasePage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/sales"

                element={

                    <ProtectedRoute>

                        <SalesPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/reports"

                element={

                    <ProtectedRoute>

                        <ReportPage />

                    </ProtectedRoute>

                }

            />

            <Route

                path="*"

                element={

                    <Navigate

                        to="/dashboard"

                        replace

                    />

                }

            />

        </Routes>

    );

}
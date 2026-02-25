import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import RegisterPage from "../pages/RegisterPage";

const requireAuth = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
        throw redirect("/login");
    }
    return null;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/dashboard",
        loader: requireAuth,
        element: <DashboardPage />,
    },
]);

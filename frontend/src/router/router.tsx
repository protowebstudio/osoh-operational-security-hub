import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

const requireAuth = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
        throw redirect("/");
    }
    return null;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        loader: requireAuth,
        element: <DashboardPage />,
    },
]);
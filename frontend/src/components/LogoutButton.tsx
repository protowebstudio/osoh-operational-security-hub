import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("auth_token");

        try {
            await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: token ? Bearer  : "",
                },
            });
        } catch {}

        localStorage.removeItem("auth_token");
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
            Logout
        </button>
    );
}

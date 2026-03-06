import { AuthService } from '../services/authService';
export default function LogoutButton() {
    const handleLogout = async () => {
    try {
      await AuthService.logout();
    } finally {
      window.location.href = '/';
    }
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

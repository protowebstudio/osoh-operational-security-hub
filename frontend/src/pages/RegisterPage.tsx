<<<<<<< Updated upstream
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";
import { setAuthToken } from "../services/apiClient";
=======
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENV } from '../config/env';
>>>>>>> Stashed changes

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
<<<<<<< Updated upstream
      const response = await apiClient<{ token: string }>("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
=======
      const response = await fetch(`${ENV.API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
>>>>>>> Stashed changes
      });

      if (!response?.token) {
        throw new Error();
      }

<<<<<<< Updated upstream
      setAuthToken(response.token);
      localStorage.setItem("auth_token", response.token);

      navigate("/dashboard");
    } catch {
      alert("Registration failed");
=======
      localStorage.setItem('auth_token', data.token);
      navigate('/dashboard');
    } catch {
      alert('Server error');
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
<<<<<<< Updated upstream
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Register
        </h2>
=======
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
>>>>>>> Stashed changes

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white"
          />

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('auth_token', data.token);
      navigate('/dashboard');
    } catch {
      alert('Server error');
    }
  };

  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
      <div className='bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md'>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          Login
        </h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500'
          />

          <button
            type='submit'
            className='w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

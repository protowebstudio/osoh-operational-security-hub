import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-slate-900 text-white'>
      
      <header className='bg-slate-800 shadow-md'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Dashboard</h1>
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition'
          >
            Logout
          </button>
        </div>
      </header>

      <main className='max-w-6xl mx-auto px-6 py-10'>
        <div className='bg-slate-800 rounded-xl shadow-lg p-6'>
          <h2 className='text-lg font-semibold mb-4'>Your Sites</h2>
          <p className='text-slate-400'>No sites yet.</p>
        </div>
      </main>

    </div>
  );
}

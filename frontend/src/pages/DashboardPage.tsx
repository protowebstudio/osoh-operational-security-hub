import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteService } from '../services/siteService';
import { RiskService } from '../services/riskService';
import { AuthService } from '../services/authService';
import type { Site } from '../models/site';
import type { RiskSnapshot } from '../models/riskSnapshot';

export function DashboardPage() {
  const navigate = useNavigate();

  const [site, setSite] = useState<Site | null>(null);
  const [snapshot, setSnapshot] = useState<RiskSnapshot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AuthService.hydrateFromStorage();

    const load = async () => {
      try {
        const sites = await SiteService.getSites();

        if (!Array.isArray(sites) || sites.length === 0) {
          setLoading(false);
          return;
        }

        const selected = sites[0];
        if (!selected) {
          setLoading(false);
          return;
        }

        setSite(selected);

        const risk = await RiskService.getSnapshot(selected.id);
        setSnapshot(risk);
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
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
          {loading && <p>Loading...</p>}
          {error && <p className='text-red-400'>{error}</p>}

          {!loading && !site && (
            <p className='text-slate-400'>No sites available.</p>
          )}

          {!loading && site && snapshot && (
            <>
              <h2 className='text-lg font-semibold mb-4'>
                Site: {site.name}
              </h2>

              <div className='space-y-2'>
                <p>Risk Score: <strong>{snapshot.score}</strong></p>
                <p>Level: <strong>{snapshot.level}</strong></p>
                <p>Event Count: {snapshot.event_count}</p>
                <p>Window Size: {snapshot.window_size}</p>
                <p>
                  Computed At:{' '}
                  {new Date(snapshot.computed_at).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

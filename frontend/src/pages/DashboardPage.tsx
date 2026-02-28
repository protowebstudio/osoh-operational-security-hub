import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteService } from "../services/siteService";
import { RiskService } from "../services/riskService";
import { AuthService } from "../services/authService";
import type { Site } from "../models/site";
import type { RiskSnapshot } from "../models/riskSnapshot";

export function DashboardPage() {
  const navigate = useNavigate();

  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [snapshot, setSnapshot] = useState<RiskSnapshot | null>(null);

  const [newName, setNewName] = useState<string>("");
  const [newUrl, setNewUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSites = async () => {
    const data = await SiteService.getSites();
    if (Array.isArray(data) && data.length > 0) {
      setSites(data);
      setSelectedSite((prev) => prev ?? data[0] ?? null);
    } else {
      setSites([]);
      setSelectedSite(null);
      setSnapshot(null);
    }
  };

  useEffect(() => {
    AuthService.hydrateFromStorage();

    const load = async () => {
      try {
        await refreshSites();
      } catch {
        setError("Failed to load sites");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const loadRisk = async () => {
      if (!selectedSite) return;
      try {
        const risk = await RiskService.getSnapshot(selectedSite.id);
        setSnapshot(risk);
      } catch {
        setError("Failed to load risk snapshot");
      }
    };

    loadRisk();
  }, [selectedSite]);

  const handleCreateSite = async () => {
    setError(null);
    setCreating(true);
    try {
      await SiteService.createSite({ name: newName.trim(), url: newUrl.trim() });
      setNewName("");
      setNewUrl("");
      await refreshSites();
    } catch (e: any) {
      setError(e?.message || "Failed to create site");
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <section className="bg-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Register Website</h2>

            <input
              type="text"
              placeholder="Project Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <input
              type="url"
              placeholder="Website URL (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white"
            />

            <button
              onClick={handleCreateSite}
              disabled={creating}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 rounded-lg transition"
            >
              {creating ? "Creating..." : "Create Site"}
            </button>
          </section>
        )}

        {!loading && sites.length === 0 && (
          <p className="text-slate-400">No sites registered yet.</p>
        )}

        {!loading && sites.length > 0 && (
          <>
            <section className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Your Sites</h2>
              <ul className="space-y-2">
                {sites.map((site) => (
                  <li key={site.id}>
                    <button
                      onClick={() => setSelectedSite(site)}
                      className={`w-full text-left px-4 py-2 rounded ${
                        selectedSite?.id === site.id
                          ? "bg-emerald-600"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                    >
                      {site.name}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {selectedSite && snapshot && (
              <section className="bg-slate-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Risk Overview — {selectedSite.name}
                </h2>

                <div className="space-y-2">
                  <p>
                    Risk Score: <strong>{snapshot.score}</strong>
                  </p>
                  <p>
                    Level: <strong>{snapshot.level}</strong>
                  </p>
                  <p>Event Count: {snapshot.event_count}</p>
                  <p>Window Size: {snapshot.window_size}</p>
                  <p>
                    Computed At:{" "}
                    {new Date(snapshot.computed_at).toLocaleString()}
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import { SiteService } from "../services/siteService";

type Site = {
  id: number;
  name: string;
  risk_threshold_high: number;
  risk_threshold_critical: number;
  risk_window_size: number;
};

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [newName, setNewName] = useState("");
  const [riskHigh, setRiskHigh] = useState("70");
  const [riskCritical, setRiskCritical] = useState("90");
  const [riskWindowSize, setRiskWindowSize] = useState("24");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSites = async () => {
    try {
      const data = await SiteService.listSites();
      setSites(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sites");
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await SiteService.createSite({
        name: newName.trim(),
        risk_threshold_high: Number(riskHigh),
        risk_threshold_critical: Number(riskCritical),
        risk_window_size: Number(riskWindowSize),
      });

      setNewName("");
      setRiskHigh("70");
      setRiskCritical("90");
      setRiskWindowSize("24");
      await loadSites();
    } catch (err) {
      console.error(err);
      setError("Failed to create site");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Operational Security Hub
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Manage monitored sites and risk thresholds from one place.
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Sites</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Current monitored properties and configured thresholds.
                </p>
              </div>
              <div className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
                {sites.length} {sites.length === 1 ? "site" : "sites"}
              </div>
            </div>

            {sites.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-sm text-slate-400">
                No sites yet. Create your first monitored site from the panel on the right.
              </div>
            ) : (
              <div className="space-y-4">
                {sites.map((site) => (
                  <div
                    key={site.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">
                          Threshold configuration for automated risk monitoring.
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-800/60 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-300">
                        Active
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">High</p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {site.risk_threshold_high}
                        </p>
                      </div>

                      <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Critical</p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {site.risk_threshold_critical}
                        </p>
                      </div>

                      <div className="rounded-lg border border-slate-800 bg-slate-900 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Window</p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {site.risk_window_size}h
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-semibold text-white">Create Site</h2>
            <p className="mt-1 text-sm text-slate-400">
              Add a new monitored site with default threshold settings.
            </p>

            <form onSubmit={handleCreateSite} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Site name
                </label>
                <input
                  type="text"
                  placeholder="e.g. main-site"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    High
                  </label>
                  <input
                    type="number"
                    placeholder="70"
                    value={riskHigh}
                    onChange={(e) => setRiskHigh(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Critical
                  </label>
                  <input
                    type="number"
                    placeholder="90"
                    value={riskCritical}
                    onChange={(e) => setRiskCritical(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Window size
                  </label>
                  <input
                    type="number"
                    placeholder="24"
                    value={riskWindowSize}
                    onChange={(e) => setRiskWindowSize(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating..." : "Create Site"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

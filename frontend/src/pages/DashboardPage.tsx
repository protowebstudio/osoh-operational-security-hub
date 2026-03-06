import { useEffect, useState } from "react";
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
    <div>
      <h1>Dashboard</h1>

      <form onSubmit={handleCreateSite}>
        <input
          type="text"
          placeholder="Site name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Risk threshold high"
          value={riskHigh}
          onChange={(e) => setRiskHigh(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Risk threshold critical"
          value={riskCritical}
          onChange={(e) => setRiskCritical(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Risk window size"
          value={riskWindowSize}
          onChange={(e) => setRiskWindowSize(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Site"}
        </button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {sites.map((site) => (
          <li key={site.id}>
            {site.name} — high: {site.risk_threshold_high}, critical: {site.risk_threshold_critical}, window: {site.risk_window_size}
          </li>
        ))}
      </ul>
    </div>
  );
}

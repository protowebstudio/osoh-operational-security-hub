import { useEffect, useMemo, useState } from "react";
import { SiteService } from "../services/siteService";
import { RiskService } from "../services/riskService";
import type { Site } from "../models/site";
import type { RiskSnapshot } from "../models/riskSnapshot"
import LogoutButton from "../components/LogoutButton";

const toUserMessage = (err: unknown): string => {
    if (err instanceof Error) {
        if (err.message === "ERR_UNAUTHORIZED") return "Unauthorized";
        if (err.message.startsWith("ERR_API_")) return "Request failed";
    }
    return "Request failed";
};

export const DashboardPage = () => {
  console.log("Dashboard mounted");
    const [sites, setSites] = useState<Site[]>([]);
    const [selectedSite, setSelectedSite] = useState<Site | null>(null);
    const [risk, setRisk] = useState<RiskSnapshot | null>(null);

    const [loadingSites, setLoadingSites] = useState(false);
    const [loadingRisk, setLoadingRisk] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSites = async () => {
            setError(null);
            setLoadingSites(true);

            try {
                const data = await SiteService.getSites();
                setSites(data);
                setSelectedSite(data[0] ?? null);
            } catch (e) {
                setError(toUserMessage(e));
            } finally {
                setLoadingSites(false);
            }
        };

        loadSites();
    }, []);

    useEffect(() => {
        const loadRisk = async () => {
            if (!selectedSite) return;

            setError(null);
            setLoadingRisk(true);

            try {
                const snapshot = await RiskService.getSnapshot(selectedSite.id);
                setRisk(snapshot);
            } catch (e) {
                setError(toUserMessage(e));
            } finally {
                setLoadingRisk(false);
            }
        };

        loadRisk();
    }, [selectedSite]);

    const derivedStatus = useMemo(() => {
        if (!selectedSite || !risk) return null;

        const high = selectedSite.risk_threshold_high;
        const critical = selectedSite.risk_threshold_critical;

        if (risk.score >= critical) return "Critical";
        if (risk.score >= high) return "High";
        return "Normal";
    }, [selectedSite, risk]);

    return (
        <div>
            <h1>Dashboard</h1>
        <LogoutButton />

            {error && <div>{error}</div>}

            {loadingSites ? (
                <div>Loading sites...</div>
            ) : (
                <select
                    value={selectedSite?.id ?? ""}
                    onChange={(e) => {
                        const site = sites.find((s) => s.id === Number(e.target.value));
                        setSelectedSite(site ?? null);
                    }}
                    disabled={sites.length === 0}
                >
                    {sites.length === 0 ? (
                        <option value="">No sites</option>
                    ) : (
                        sites.map((site) => (
                            <option key={site.id} value={site.id}>
                                {site.name}
                            </option>
                        ))
                    )}
                </select>
            )}

            {selectedSite && (
                <div>
                    <div>High threshold: {selectedSite.risk_threshold_high}</div>
                    <div>Critical threshold: {selectedSite.risk_threshold_critical}</div>
                    <div>Window size: {selectedSite.risk_window_size}</div>
                </div>
            )}

            {loadingRisk && <div>Loading risk...</div>}

            {risk && (
                <div>
                    <div>Score: {risk.score}</div>
                    <div>Backend level: {risk.level}</div>
                    <div>Derived status: {derivedStatus}</div>
                    <div>Event count: {risk.event_count}</div>
                    <div>Computed at: {risk.computed_at}</div>
                </div>
            )}
        </div>
    );
};

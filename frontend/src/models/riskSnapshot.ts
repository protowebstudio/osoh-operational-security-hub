export interface RiskSnapshot {
    site_id: number;
    score: number;
    level: "Normal" | "High" | "Critical";
    window_size: number;
    event_count: number;
    computed_at: string;
}

export function getRiskColor(level: RiskSnapshot["level"]): string {
    switch (level) {
        case "Normal":
            return "text-emerald-400";
        case "High":
            return "text-yellow-400";
        case "Critical":
            return "text-red-500";
        default:
            return "text-slate-400";
    }
}

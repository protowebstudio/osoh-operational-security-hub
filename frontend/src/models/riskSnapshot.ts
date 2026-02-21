export interface RiskSnapshot {
    site_id: number;
    score: number;
    level: "Normal" | "High" | "Critical";
    window_size: number;
    event_count: number;
    computed_at: string;
}
export interface Site {
    id: number;
    name: string;
    risk_threshold_high: number;
    risk_threshold_critical: number;
    risk_window_size: number;
}
export type HealthStatus = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'SICK';
export type Ubication = 'INDOOR' | 'OUTDOOR' | 'PARTIAL_SHADE';

export interface Plant {
  id: string;
  name: string;
  scientific_name?: string;
  watering_frequency_days: number;
  location: Ubication;
  health: HealthStatus;
  image_url?: string;
  last_watered_at: number; // timestamp
  is_local?: boolean; // Flag for local storage vs fully synced
  created_at: number;
}

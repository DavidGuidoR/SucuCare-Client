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
  last_watered_at: number;
  is_local?: boolean;
  created_at: number;
}

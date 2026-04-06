import type { Plant } from '../features/plants/types';

export const mockedPlants: Plant[] = [
  {
    id: '1',
    name: 'Sábila',
    scientific_name: 'Aloe barbadensis miller',
    watering_frequency_days: 14,
    location: 'INDOOR',
    health: 'EXCELLENT',
    image_url: 'https://images.unsplash.com/photo-1502920795919-28eb72e07e2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMGluZG9vcnxlbnwxfHx8fDE3NzUxNjY1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    last_watered_at: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
    is_local: true
  },
  {
    id: '2',
    name: 'Lengua de suegra',
    scientific_name: 'Sansevieria trifasciata',
    watering_frequency_days: 21,
    location: 'PARTIAL_SHADE',
    health: 'GOOD',
    image_url: 'https://images.unsplash.com/photo-1550207477-85f418dc3448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHxlbnwxfHx8fDE3NzUyMTMwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    last_watered_at: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
    created_at: Date.now() - 1000 * 60 * 60 * 24 * 60,
    is_local: true
  }
];

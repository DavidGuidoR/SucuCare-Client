import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Plant } from '../features/plants/types';

interface PlantStore {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
  updatePlant: (id: string, updatedPlant: Partial<Plant>) => void;
  deletePlant: (id: string) => void;
  waterPlant: (id: string) => void;
  syncLocalPlants: () => Promise<void>;
}

export const usePlantStore = create<PlantStore>()(
  persist(
    (set) => ({
      plants: [],
      addPlant: (plant) => set((state) => ({ plants: [...state.plants, plant] })),
      updatePlant: (id, updatedPlant) =>
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id ? { ...p, ...updatedPlant } : p
          ),
        })),
      deletePlant: (id) =>
        set((state) => ({
          plants: state.plants.filter((p) => p.id !== id),
        })),
      waterPlant: (id) =>
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === id ? { ...p, last_watered_at: Date.now() } : p
          ),
        })),
      syncLocalPlants: async () => {
        console.log('Syncing local plants...');
        set((state) => ({
          plants: state.plants.map((p) => ({ ...p, is_local: false })),
        }));
      },
    }),
    {
      name: 'sucucare-plant-storage',
    }
  )
);

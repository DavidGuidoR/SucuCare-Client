import { usePlantStore } from '../../../store/usePlantStore';
import type { Plant } from '../types';

export const usePlants = () => {
  const addPlantToStore = usePlantStore((state) => state.addPlant);
  const updatePlantInStore = usePlantStore((state) => state.updatePlant);
  const deletePlantFromStore = usePlantStore((state) => state.deletePlant);
  const waterPlantInStore = usePlantStore((state) => state.waterPlant);

  const addPlant = async (plant: Plant) => {
    // const response = await fetch('/api/plants', { method: 'POST', body: JSON.stringify(plant) });
    // const createdPlant = await response.json();
    
    addPlantToStore(plant);
  };

  const editPlant = async (id: string, updatedData: Partial<Plant>) => {
    // await fetch(`/api/plants/${id}`, { method: 'PUT', body: JSON.stringify(updatedData) });
    
    updatePlantInStore(id, updatedData);
  };

  const removePlant = async (id: string) => {
    // await fetch(`/api/plants/${id}`, { method: 'DELETE' });
    
    deletePlantFromStore(id);
  };

  const waterPlant = async (id: string) => {
    // await fetch(`/api/plants/${id}/water`, { method: 'POST' });

    waterPlantInStore(id);
  };

  return {
    addPlant,
    editPlant,
    removePlant,
    waterPlant
  };
};

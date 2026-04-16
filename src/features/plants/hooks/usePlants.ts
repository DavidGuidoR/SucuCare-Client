import { usePlantStore } from '../../../store/usePlantStore';
import type { Plant } from '../types';

export const usePlants = () => {
  const addPlantToStore = usePlantStore((state) => state.addPlant);
  const updatePlantInStore = usePlantStore((state) => state.updatePlant);
  const deletePlantFromStore = usePlantStore((state) => state.deletePlant);

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

  return {
    addPlant,
    editPlant,
    removePlant
  };
};

import { useState } from "react";
import { Plus, Sprout } from "lucide-react";
import { usePlantStore } from "../../../store/usePlantStore";
import { usePlants } from "../hooks/usePlants";
import PlantCard from "../components/PlantCard";
import PlantForm from "../components/PlantForm";
import ConfirmModal from "../../shared/components/ConfirmModal";
import type { Plant } from "../types";

export const Dashboard = () => {
    const plants = usePlantStore((state) => state.plants);
    const { removePlant, waterPlant } = usePlants();

    const [isAdding, setIsAdding] = useState(false);
    const [plantToEdit, setPlantToEdit] = useState<Plant | null>(null);
    const [plantToDelete, setPlantToDelete] = useState<Plant | null>(null);

    const handleEdit = (id: string) => {
        const plant = plants.find(p => p.id === id);
        if (plant) setPlantToEdit(plant);
    };

    const handleDeleteClick = (id: string) => {
        const plant = plants.find(p => p.id === id);
        if (plant) setPlantToDelete(plant);
    };

    const confirmDelete = () => {
        if (plantToDelete) {
            removePlant(plantToDelete.id);
            setPlantToDelete(null);
        }
    };

    if (isAdding || plantToEdit) {
        return (
            <div className="flex flex-col items-center w-full min-h-[calc(100vh-200px)] py-4">
                <PlantForm 
                    initialData={plantToEdit || undefined}
                    isEditing={!!plantToEdit}
                    onSuccess={() => { setIsAdding(false); setPlantToEdit(null); }} 
                    onCancel={() => { setIsAdding(false); setPlantToEdit(null); }} 
                />
            </div>
        );
    }

    if (plants.length === 0) {
        return (
            <div className="flex flex-col items-center gap-8">
                <p className="mb-12 text-center text-zinc-600 text-base">Registra y gestiona tu colección de plantas</p>
                <div className="relative flex items-center justify-center">
                    <div className="absolute size-20 bg-caribean-green-200 rounded-full blur-xl"></div>
                    <Sprout className="text-clover-bright-500 size-16 relative z-10" />
                </div>
                <h2 className="text-forest-deep-500 text-2xl font-bold">Comienza tu jardín digital</h2>
                <p className="text-center text-zinc-600 text-base">Aun no tienes plantas registradas, añade tu primera planta y recibe recordatorios de riego personalizados</p>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex flex-col gap-2 size-48 items-center justify-center rounded-full aspect-square p-4 bg-linear-to-br from-clover-bright-500 via-mountain-meadow-500 to-caribean-green-500 transition-all duration-300 ease-out shadow-2xl shadow-caribean-green-500/50 hover:scale-105 hover:brightness-90 hover:shadow-xl cursor-pointer"
                >
                    <Plus className="size-20 text-white" />
                    <span className="text-white text-xl">Añadir planta</span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-forest-deep-500 text-2xl font-bold">Tu Jardín</h2>
                    <p className="text-zinc-600 text-base">Tienes {plants.length} {plants.length === 1 ? 'planta' : 'plantas'}</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-br from-clover-bright-500 via-mountain-meadow-500 to-caribean-green-500 text-white transition-all duration-300 hover:scale-105 hover:brightness-90 hover:shadow-md cursor-pointer font-medium"
                >
                    <Plus className="size-5 text-white" />
                    <span>Añadir planta</span>
                </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.map(plant => (
                    <PlantCard 
                        key={plant.id} 
                        {...plant} 
                        onEdit={handleEdit}
                        onDelete={handleDeleteClick}
                        onWater={waterPlant}
                    />
                ))}
            </div>

            <ConfirmModal
                isOpen={!!plantToDelete}
                title="Eliminar Planta"
                message={`¿Estás seguro que deseas eliminar "${plantToDelete?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                onCancel={() => setPlantToDelete(null)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Dashboard;
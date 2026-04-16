import { useState } from "react";
import { Calendar, Droplets, Pencil, Trash2 } from "lucide-react";
import type { Plant } from "../types";
import { checkNeedsWatering } from "../utils/watering";
import { useSettingsStore } from "../../../store/useSettingsStore";

interface PlantCardProps extends Plant {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onWater?: (id: string) => void;
}

export const PlantCard = ({ onEdit, onDelete, onWater, ...plantData }: PlantCardProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const reminder_hour = useSettingsStore((state) => state.reminder_hour);

    const isWateringNeeded = checkNeedsWatering(plantData.last_watered_at, plantData.watering_frequency_days, reminder_hour);

    const handleWaterClick = () => {
        if (isWateringNeeded && onWater && !isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                onWater(plantData.id);
                setIsAnimating(false);
            }, 800);
        }
    };

    return (
        <div className="flex flex-col gap-2 items-center bg-white shadow-lg rounded-xl p-4 relative group">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button 
                    onClick={() => onEdit?.(plantData.id)}
                    className="p-2 bg-stone-100/80 backdrop-blur-sm text-stone-600 hover:text-mountain-meadow-600 hover:bg-stone-200 rounded-full transition-colors"
                    title="Editar planta"
                >
                    <Pencil className="size-4" />
                </button>
                <button 
                    onClick={() => onDelete?.(plantData.id)}
                    className="p-2 bg-stone-100/80 backdrop-blur-sm text-stone-600 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    title="Eliminar planta"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
            <div 
                className={`relative mb-4 ${isWateringNeeded ? 'cursor-pointer hover:scale-105' : ''} transition-transform duration-300`}
                onClick={handleWaterClick}
            >
                <img src={plantData.image_url} alt={plantData.name} className={`rounded-full size-36 ring-2 ${isWateringNeeded ? 'ring-blue-400' : 'ring-mountain-meadow-500'} object-cover transition-all duration-500 ${isAnimating ? 'scale-110 blur-sm brightness-110' : ''}`} />
                
                {isWateringNeeded && !isAnimating && (
                    <div className="absolute inset-0 bg-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all animate-pulse shadow-lg shadow-blue-500/40">
                        <Droplets className="size-12 drop-shadow-md animate-bounce text-caribean-green-300" />
                    </div>
                )}

                {isAnimating && (
                    <div className="absolute inset-0 bg-caribean-green-400/50 rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-300">
                        <Droplets className="size-16 drop-shadow-lg text-caribean-green-300" />
                    </div>
                )}
            </div>
            <h3 className="text-forest-deep-500 text-xl font-bold">{plantData.name}</h3>
            <p className="text-zinc-600 text-sm">{plantData.scientific_name}</p>
            <div className="text-blue-500 text-xs font-bold rounded-full px-2 py-1 bg-sky-100">{plantData.location}</div>
            <div className="text-blue-500 text-xs font-bold rounded-full px-2 py-1 bg-sky-100">{plantData.health}</div>
            <section className="flex gap-2 mt-6">
                <Droplets className="size-4 text-cyan-400" />
                <p className="text-zinc-600 text-sm">Cada: {plantData.watering_frequency_days} días</p>
            </section>
            <section className="flex gap-2">
                <Calendar className="size-4 text-caribean-green-500" />
                <p className="text-zinc-600 text-sm">Registrado: {new Date(plantData.created_at).toLocaleDateString()}</p>
            </section>
        </div>
    );
};

export default PlantCard;
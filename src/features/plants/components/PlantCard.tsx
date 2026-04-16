import { Calendar, Droplets, Pencil, Trash2 } from "lucide-react";
import type { Plant } from "../types";

interface PlantCardProps extends Plant {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const PlantCard = ({ onEdit, onDelete, ...plantData }: PlantCardProps) => {
    return (
        <div className="flex flex-col gap-2 items-center bg-white shadow-lg rounded-xl p-4 relative group">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <img src={plantData.image_url} alt={plantData.name} className="rounded-full size-36 ring-2 ring-mountain-meadow-500 mb-4 object-cover" />
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
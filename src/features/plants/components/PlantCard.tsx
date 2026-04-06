import { Calendar, Droplets } from "lucide-react";
import type { Plant } from "../types";

export const PlantCard = (plantData: Plant) => {
    return (
        <div className="flex flex-col gap-2 items-center bg-white shadow-lg rounded-xl p-4">
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
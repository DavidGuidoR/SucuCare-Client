import { Plus, Sprout } from "lucide-react";

export const Dashboard = () => {
    return (
        <div className="flex flex-col items-center gap-8">
            <p className="mb-12 text-center text-zinc-600 text-base">Registra y gestiona tu colección de plantas</p>
            <div className="relative flex items-center justify-center">
                <div className="absolute size-20 bg-caribean-green-300 rounded-full blur-xl"></div>
                <Sprout className="text-clover-bright-500 size-16 relative z-10" />
            </div>
            <h2 className="text-forest-deep-500 text-2xl font-bold">Comienza tu jardín digital</h2>
            <p className="text-center text-zinc-600 text-base">Aun no tienes plantas registradas, añade tu primera planta y recibe recordatorios de riego personalizados</p>
            <button className="flex flex-col gap-2 max-w-sm items-center rounded-full aspect-square p-4 bg-linear-to-br from-clover-bright-500 via-mountain-meadow-500 to-caribean-green-500">
                <Plus className="size-12 text-white" />
                <span className="text-white">Añadir planta</span>
            </button>
        </div>
    );
};

export default Dashboard;
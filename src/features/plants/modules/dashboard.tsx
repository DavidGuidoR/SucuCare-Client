import { Plus, Sprout } from "lucide-react";

export const Dashboard = () => {
    return (
        <div className="flex flex-col items-center">
            <p>Registra y gestiona tu colección de plantas</p>
            <Sprout />
            <h2>Comienza tu jardín digital</h2>
            <p>Aun no tienes plantas registradas, añade tu primera planta y recibe recordatorios de riego personalizados</p>
            <button className="flex flex-col gap-2 max-w-sm items-center rounded-full aspect-square p-4 bg-linear-to-br/oklch from-indigo-500 to-teal-400">
                <Plus className="size-12 text-white" />
                <span className="text-white">Añadir planta</span>
            </button>
        </div>
    );
};

export default Dashboard;
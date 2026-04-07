import React, { useState, useRef } from 'react';
import { Leaf, ImageIcon } from 'lucide-react';
import { usePlantStore } from '../../../store/usePlantStore';
import type { Plant, Ubication } from '../types';

interface PlantFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PlantForm: React.FC<PlantFormProps> = ({ onSuccess, onCancel }) => {
  const addPlant = usePlantStore((state) => state.addPlant);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [category, setCategory] = useState<Ubication | ''>('');
  const [wateringFrequency, setWateringFrequency] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !species || !category || !wateringFrequency) return;

    const newPlant: Plant = {
      id: crypto.randomUUID(),
      name,
      scientific_name: species,
      location: category as Ubication,
      health: 'GOOD',
      watering_frequency_days: Number(wateringFrequency),
      last_watered_at: Date.now(),
      created_at: Date.now(),
      is_local: true,
      image_url: imagePreview || 'https://images.unsplash.com/photo-1416879598553-92f7596541f5?q=80&w=400&h=400&auto=format&fit=crop',
    };

    addPlant(newPlant);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-100 w-full max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900 mb-2">
          <Leaf className="text-mountain-meadow-500 size-6" />
          Registrar Nueva Planta
        </h2>
        <p className="text-stone-500 text-sm">
          Completa el formulario para agregar una nueva planta a tu colección
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen */}
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-bold text-sm text-stone-900">
              Imagen de la Planta
            </label>
            <div className="flex items-center flex-col gap-4">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="size-24 rounded-full object-cover ring-2 ring-mountain-meadow-500 shadow-md shadow-mountain-meadow-500/40 cursor-pointer hover:brightness-90 transition-all" 
                  onClick={triggerFileInput}
                />
              ) : (
                <div 
                  className="size-24 rounded-full bg-stone-100 border-2 border-dashed border-mountain-meadow-300 flex items-center justify-center text-stone-400 cursor-pointer hover:bg-stone-200 transition-colors"
                  onClick={triggerFileInput}
                >
                  <ImageIcon className="size-8 text-mountain-meadow-300" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-stone-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-mountain-meadow-50 file:text-mountain-meadow-700 hover:file:bg-mountain-meadow-100 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-bold text-sm text-stone-900">
              Nombre de la Planta <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="ej. Mi Monstera"
              className="bg-stone-100 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-mountain-meadow-500 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Especie */}
          <div className="flex flex-col gap-2">
            <label htmlFor="species" className="font-bold text-sm text-stone-900">
              Especie <span className="text-red-500"></span>
            </label>
            <input
              id="species"
              type="text"
              required
              placeholder="ej. Monstera Deliciosa"
              className="bg-stone-100 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-mountain-meadow-500 transition-all"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-bold text-sm text-stone-900">
              Categoría <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                required
                className="w-full bg-stone-100 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-mountain-meadow-500 transition-all appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value as Ubication)}
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="INDOOR">Interior</option>
                <option value="OUTDOOR">Exterior</option>
                <option value="PARTIAL_SHADE">Sombra Parcial</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-400">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Frecuencia de Riego */}
          <div className="flex flex-col gap-2">
            <label htmlFor="wateringFrequency" className="font-bold text-sm text-stone-900">
              Frecuencia de Riego <span className="text-red-500">*</span>
            </label>
            <input
              id="wateringFrequency"
              type="number"
              min="1"
              required
              placeholder="ej. Cada 7 días (escribe 7)"
              className="bg-stone-100 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-mountain-meadow-500 transition-all"
              value={wateringFrequency}
              onChange={(e) => setWateringFrequency(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-xl py-3.5 px-6 font-bold flex items-center justify-center transition-colors"
            >
              Cancelar
            </button>
          )}
          <button 
              type="submit" 
              className="flex-1 bg-stone-950 hover:bg-stone-900 text-white rounded-xl py-3.5 px-6 font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Leaf className="size-5" />
            Registrar Planta
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;

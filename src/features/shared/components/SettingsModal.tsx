import React, { useState } from 'react';
import { Settings, X, Bell } from 'lucide-react';
import { useSettingsStore } from '../../../store/useSettingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { reminder_hour, setReminderHour } = useSettingsStore();
  const [tempHour, setTempHour] = useState(reminder_hour);

  if (!isOpen) return null;

  const handleSave = () => {
    setReminderHour(tempHour);
    // Also try to request notification permissions if they are editing notifications
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-stone-100 text-stone-600 rounded-full">
                <Settings className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">Configuración</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
          
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="reminder" className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Bell className="size-4 text-caribean-green-500" />
                Hora de Recordatorio
              </label>
              <p className="text-xs text-stone-500 mb-1">A qué hora te gustaría recibir la notificación para regar tus plantas todos los días.</p>
              <input
                id="reminder"
                type="time"
                value={tempHour}
                onChange={(e) => setTempHour(e.target.value)}
                className="bg-stone-100 rounded-xl px-4 py-3 text-stone-900 outline-none focus:ring-2 focus:ring-mountain-meadow-500 transition-all font-mono text-center text-lg w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-stone-50 p-4 border-t border-stone-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-mountain-meadow-500 hover:bg-mountain-meadow-600 transition-colors shadow-sm"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { usePlantStore } from '../../../store/usePlantStore';
import { checkNeedsWatering } from '../../plants/utils/watering';

export const NotificationWatcher = () => {
  const { reminder_hour, last_notified_date, setLastNotifiedDate } = useSettingsStore();
  const plants = usePlantStore((state) => state.plants);
  
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkAndNotify = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      const now = new Date();
      const todayStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      if (last_notified_date === todayStr) return;

      const [hoursStr, minutesStr] = reminder_hour.split(':');
      const reminderTime = new Date();
      reminderTime.setHours(Number(hoursStr), Number(minutesStr), 0, 0);

      if (now.getTime() >= reminderTime.getTime()) {

        let plantsToWater = 0;

        for (const plant of plants) {
            const isWateringNeeded = checkNeedsWatering(plant.last_watered_at, plant.watering_frequency_days, reminder_hour);
            if (isWateringNeeded) {
                plantsToWater++;
            }
        }

        const title = plantsToWater > 0 
            ? "¡Hora de regar tus plantas! 💧"
            : "Jardín Saludable 🌿";
            
        const body = plantsToWater > 0
            ? `Tienes ${plantsToWater} ${plantsToWater === 1 ? 'planta esperando' : 'plantas esperando'} por agua.`
            : "No tienes ninguna planta que necesite agua hoy. ¡Buen trabajo!";

        new Notification(title, { body, icon: '/favicon.ico' });
        
        setLastNotifiedDate(todayStr);
      }
    };

    checkAndNotify();

    intervalRef.current = window.setInterval(checkAndNotify, 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reminder_hour, last_notified_date, plants, setLastNotifiedDate]);

  return null;
};

export default NotificationWatcher;

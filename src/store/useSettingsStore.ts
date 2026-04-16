import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  reminder_hour: string;
  last_notified_date: string | null;
  setReminderHour: (hour: string) => void;
  setLastNotifiedDate: (date: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      reminder_hour: '09:00', // Default 9 AM
      last_notified_date: null,
      setReminderHour: (hour: string) => set({ reminder_hour: hour }),
      setLastNotifiedDate: (date: string) => set({ last_notified_date: date })
    }),
    {
      name: 'sucucare-settings-storage',
    }
  )
);

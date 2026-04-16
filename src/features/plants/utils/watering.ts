export const checkNeedsWatering = (lastWateredAt: number, frequencyDays: number, reminderHour: string = '09:00'): boolean => {
    const [hoursStr, minutesStr] = reminderHour.split(':');
    const offsetMs = (Number(hoursStr) * 60 * 60 * 1000) + (Number(minutesStr) * 60 * 1000);

    // Restamos el offset para que la "hora de recordatorio" se convierta matemáticamente en la medianoche (00:00)
    const shiftedPast = new Date(lastWateredAt - offsetMs);
    shiftedPast.setHours(0, 0, 0, 0);
    
    const shiftedToday = new Date(Date.now() - offsetMs);
    shiftedToday.setHours(0, 0, 0, 0);
    
    const daysElapsed = Math.floor((shiftedToday.getTime() - shiftedPast.getTime()) / (1000 * 60 * 60 * 24));

    if (daysElapsed <= 0) return false;

    if (frequencyDays <= 0) return true;

    return daysElapsed >= frequencyDays;
};

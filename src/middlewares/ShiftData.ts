import Shift from "../models/Shift";

 export const getShiftsData = async () => {
    try {
        const shifts = await Shift.findAll();

        // Process data to calculate required fields
        return shifts.map(shift => {
            const {startTime,endTime,actualHours}=shift
            return {
                date: startTime.toISOString().split('T')[0], // Get date part
                startTime: startTime.toTimeString().split(' ')[0].slice(0, 5), // Get time part HH:mm
                endTime: endTime.toTimeString().split(' ')[0].slice(0, 5), // Get time part HH:mm
                actualHours: actualHours,
            };
        });
    } catch (error) {
        console.error('Error fetching shift data:', error);
        throw error;
    }
};
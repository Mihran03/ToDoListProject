import React, { createContext, useContext, useState, useEffect } from 'react';

const CalendarInfoContext = createContext();

export const CalendarInfoProvider = ({ children }) => {
    const [calendarInfo, setCalendarInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCalendarInfo = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/calendar_info/');
          const data = await response.json();
          setCalendarInfo(data.calendar_info || []); // Ensure it's an array
        } catch (error) {
          console.error('Error fetching calendar info:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCalendarInfo();
    }, []);

    const eventDetails = calendarInfo
        .filter(info => {
            // Ensure name and date are not null or empty
            const date = info.properties?.Date?.date?.start;
            const name = info.properties?.Name?.title?.[0]?.plain_text;
            return date && name;
        })
        .map(info => {
            // Ensure properties exist and are not null or undefined
            const date = info.properties?.Date?.date?.start || '';
            const name = info.properties?.Name?.title?.[0]?.plain_text || 'No Name';
            const category = info.properties?.Category?.select?.name || 'Other';

            return {
                date,
                name,
                category
            };
        });

    return (
        <CalendarInfoContext.Provider value={{ calendarInfo, eventDetails, loading }}>
            {children}
        </CalendarInfoContext.Provider>
    );
};

export const useCalendarInfo = () => useContext(CalendarInfoContext);

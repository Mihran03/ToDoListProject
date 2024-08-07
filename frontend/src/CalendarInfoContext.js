import React, { createContext, useContext, useState, useEffect } from 'react';

const CalendarInfoContext = createContext();

export const CalendarInfoProvider = ({ children }) => {
    const [calendarInfo, setCalendarInfo] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/calendar_info/')
        .then(response => response.json())
        .then(data => setCalendarInfo(data.calendar_info))
        .catch(error => console.error('Error fetching calendar info:', error));
    }, []);

    const eventDetails = calendarInfo.map(info => ({
        date: info.properties.Date.date.start,
        name: info.properties.Name.title[0].plain_text
      }));// Extract start dates from calendar info

    return (
        <CalendarInfoContext.Provider value={{ calendarInfo, setCalendarInfo, eventDetails }}>
            {children}
        </CalendarInfoContext.Provider>
    );
};

export const useCalendarInfo = () => useContext(CalendarInfoContext);

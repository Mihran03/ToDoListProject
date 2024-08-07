import React, { useState } from 'react';
import { Calendar as RSuiteCalendar } from 'rsuite';
import { Box, useColorModeValue } from '@chakra-ui/react';
import 'rsuite/dist/rsuite.min.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const calendarBg = useColorModeValue('white', 'gray.700');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box
      p={4}
      bg={calendarBg}
      h="full" // Set height to full to take up all space in the container
      w="full" // Set width to full
    >
      <RSuiteCalendar
        value={date}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        style={{
          height: '100%', // Ensures calendar takes up the full height of its container
          width: '100%', // Ensures calendar takes up the full width of its container
          backgroundColor: calendarBg,
          border: 'none', // Removes border
        }}
      />
    </Box>
  );
};

export default CustomCalendar;

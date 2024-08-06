// src/components/Calendar.js
import React, { useState } from 'react';
import { Calendar } from 'rsuite';
import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import 'rsuite/dist/rsuite.min.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const calendarBg = useColorModeValue('white', 'gray.700');
  const headerTextColor = useColorModeValue('gray.800', 'white');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Box 
      p={4} 
      borderRadius="md" 
      boxShadow="md" 
      bg={calendarBg}
      maxWidth="lg" 
      mx="auto"
    >
      <Text fontSize="xl" color={headerTextColor} mb={4} textAlign="center">
        Calendar
      </Text>
      <Calendar
        value={date}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        style={{
          backgroundColor: calendarBg, // Ensure background matches the container
          borderRadius: '0',          // Remove border radius
          boxShadow: 'none',          // Remove box shadow
        }}
      />
    </Box>
  );
};

export default CustomCalendar;

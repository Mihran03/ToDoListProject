// src/components/DateTime.js
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(dateTime, "eeee, MMMM d'th' yyyy");
  // This will produce a format like "Wednesday, January 5th 2024"

  return (
    <Box p={5}>
      <Text fontSize="2xl" fontWeight='bold'>{formattedDate}</Text>
      <Text fontSize="xl">{dateTime.toLocaleTimeString()}</Text>
    </Box>
  );
};

export default DateTime;

// src/components/DateTime.js
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box p={5} >
      <Text fontSize="2xl">{dateTime.toLocaleDateString()}</Text>
      <Text fontSize="xl">{dateTime.toLocaleTimeString()}</Text>
    </Box>
  );
};

export default DateTime;

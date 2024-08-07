// src/components/Weather.js
import { Box, Text, Flex, Icon } from '@chakra-ui/react';
import { MdWbSunny } from 'react-icons/md'; // Example weather icon

const Weather = () => {
  // Example data for the weather
  const weatherData = {
    name: 'New York', // Replace with your city
    weather: [{ description: 'Sunny' }], // Replace with actual weather description
    main: { temp: 25 }, // Replace with actual temperature
  };

  return (
    <Box p={5} >
      <Text fontSize="2xl">{weatherData.name}</Text>
      <Flex align="center" mt={2}>
        <Icon as={MdWbSunny} boxSize={8} />
        <Text fontSize="xl" ml={2}>{weatherData.weather[0].description}</Text>
      </Flex>
      <Text fontSize="xl" mt={2}>{weatherData.main.temp}°C</Text>
    </Box>
  );
};

export default Weather;

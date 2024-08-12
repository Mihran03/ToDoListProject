import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Text, Flex, Icon, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { MdWbSunny, MdCloud, MdSnowing, MdCloudySnowing } from 'react-icons/md';

const Weather = () => {
  const [forecastData, setForecastData] = useState(null);
  const [locationError, setLocationError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchForecast = async (lat, lon) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/weather/forecast/?lat=${lat}&lon=${lon}`);
        setForecastData(response.data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setLocationError("Failed to fetch forecast data.");
      }
    };

    const handleSuccess = (position) => {
      fetchForecast(position.coords.latitude, position.coords.longitude);
    };

    const handleError = (error) => {
      console.error('Error getting location:', error.message);
      setLocationError("Unable to access your location. Please ensure location services are enabled and allowed for this website.");
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const weatherIcon = (weather) => {
    if (weather.includes('cloud')) return <Icon as={MdCloud} boxSize="4rem" color="gray.500" />;
    if (weather.includes('snow')) return <Icon as={MdSnowing} boxSize="4rem" color="blue.500" />;
    if (weather.includes('rain') || weather.includes('drizzle')) return <Icon as={MdCloudySnowing} boxSize="4rem" color="blue.600" />;
    return <Icon as={MdWbSunny} boxSize="4rem" color="yellow.500" />;
  };

  if (locationError) return (
    <Box p="1rem" width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Text fontSize="1rem" color="red.500" textAlign="center">{locationError}</Text>
      <Button colorScheme="blue" mt="0.5rem" onClick={() => window.location.reload()}>Retry</Button>
    </Box>
  );

  if (!forecastData) return (
    <Box p="1rem" width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
      <Text mt="1rem" fontSize="1rem">Loading weather data...</Text>
    </Box>
  );

  const today = forecastData.forecast.forecastday[0];
  const otherDays = forecastData.forecast.forecastday.slice(1);

  return (
    <Box p="1rem" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <Flex justifyContent="space-between">
        <Flex direction="column" textAlign="left">
          <Text marginTop="1.25rem" fontSize="2xl" fontWeight="bold">{forecastData.location.name}</Text>
        </Flex>
        <Flex direction="column" align="center">
          {weatherIcon(today.day.condition.text.toLowerCase())}
          <Text fontSize="1rem" mt="0.25rem">{today.day.condition.text}</Text>
          <Text fontSize="1rem">{Math.round(today.day.avgtemp_c)}°C</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center" mt="auto">
        <Button size="md" onClick={onOpen} alignSelf="center">
          See More
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            shadow="2xl"
            borderWidth="0.0625rem"
            borderColor="rgba(40, 47, 80, 0.7)"
            borderRadius="0.5rem"
            bg="rgba(40, 55, 80, 0.9)"
            color="white"
          >
            <ModalHeader fontSize="1.25rem">Weather Forecast</ModalHeader>
            <ModalCloseButton />
            <ModalBody maxH="31.25rem" overflowY="auto" className="scrollbar">
              <Flex direction="row" wrap="wrap" justify="center">
                {otherDays.map((day, index) => (
                  <Box key={index} p="0.5rem" textAlign="center">
                    {weatherIcon(day.day.condition.text.toLowerCase())}
                    <Text fontSize="0.75rem" mt="0.25rem">{new Date(day.date).toLocaleDateString()}</Text>
                    <Text fontSize="0.75rem">{day.day.condition.text}</Text>
                    <Text fontSize="0.75rem">{Math.round(day.day.avgtemp_c)}°C</Text>
                  </Box>
                ))}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr="0.75rem" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Weather;

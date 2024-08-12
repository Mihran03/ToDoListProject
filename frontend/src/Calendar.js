import React, { useState } from 'react';
import Calendar from 'react-calendar';
import {
  Box, useColorModeValue, Text, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure, Flex, Grid
} from '@chakra-ui/react';
import 'react-calendar/dist/Calendar.css';
import { useCalendarInfo } from './CalendarInfoContext';

const categoryColors = {
  'Work': '#FFD700',  // Yellow
  'Family': '#800080',  // Purple
  'Personal': '#FF0000',  // Red
  'Other': '#E0E0E0'    // Grey
};

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const { eventDetails } = useCalendarInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const openEventModal = (date) => {
    const currentDate = date.toISOString().split('T')[0];
    const dayEvents = eventDetails.filter(event => event.date === currentDate);
    setSelectedDayEvents(dayEvents);
    onOpen();
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const currentDate = date.toISOString().split('T')[0];
      const dayEvents = eventDetails.filter(event => event.date === currentDate);

      return (
        <Box position="relative" width="100%" height="100%" >
          <Grid templateColumns="repeat(2, 1fr)" gap="0.2rem">
            {dayEvents.slice(0, 2).map((event, index) => (
              <Box key={index}
                width="0.7rem"  // Fixed sizing using rem
                height="0.7rem" // Fixed sizing using rem
                borderRadius="50%"
                bg={categoryColors[event.category] || categoryColors['Other']}
                margin="auto"
              />
            ))}
          </Grid>
          {dayEvents.length > 2 && (
            <Text
              position="center"
              bottom="0.2rem"
              right="0.2rem"
              fontSize="0.6rem"
              color="red.500"
            >
              2+
            </Text>
          )}
        </Box>
      );
    }
  };

  const onClickDay = (value) => {
    openEventModal(value);
  };

  return (
    <Box 
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      
      
    >
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
        onClickDay={onClickDay}
        className="chakra-calendar" // Add custom className for styling
        tileClassName="custom-tile" // Add custom className for tile styling
      />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Events on {selectedDayEvents[0]?.date}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDayEvents.map((event, index) => (
              <Flex key={index} align="center" mb="0.5rem">
                <Box
                  width="1rem" // Fixed sizing using rem
                  height="1rem" // Fixed sizing using rem
                  borderRadius="50%"
                  bg={categoryColors[event.category] || categoryColors['Other']}
                  mr="0.5rem"
                />
                <Text fontSize="0.875rem">{event.name}</Text>  {/* Use rem for font size */}
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </Box>
  );
};

export default CustomCalendar;

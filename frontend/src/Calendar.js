import React, { useState } from 'react';
import { Calendar as RSuiteCalendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
  Box, useColorModeValue, Text, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure, Flex
} from '@chakra-ui/react';
import { useCalendarInfo } from './CalendarInfoContext';

const categoryColors = {
  'Work': '#FFD700',  // Yellow
  'Family': '#800080',  // Purple
  'Personal': '#FF0000',  // Red
  'Other': '#E0E0E0'    // Grey
};

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const calendarBg = useColorModeValue('rgba(255, 255, 255, 0.0)', 'rgba(23, 25, 35, 0.8)'); // Adjusted for light and dark modes
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

  const renderCell = (date) => {
    const currentDate = date.toISOString().split('T')[0];
    const dayEvents = eventDetails.filter(event => event.date === currentDate);

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '4px'
      }}>
        {dayEvents.slice(0, 3).map((event, index) => (
          <Box key={index} style={{
            marginTop: '2px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: categoryColors[event.category] || categoryColors['Other']
          }}/>
        ))}
        {dayEvents.length >= 3 && (
          <Box style={{
            marginTop: '2px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px'
          }}>3+</Box>
        )}
        {dayEvents.length > 0 && (
          <Button size="xs" onClick={() => openEventModal(date)} style={{ marginTop: '4px' }}>
            See More
          </Button>
        )}
      </div>
    );
  };

  return (
    <Box p={4} bg={calendarBg} h="full" w="full">
      <RSuiteCalendar
        value={date}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        style={{ height: '100%', width: '100%', backgroundColor: calendarBg, border: 'none' }}
        renderCell={renderCell}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Events on {selectedDayEvents[0]?.date}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDayEvents.map((event, index) => (
              <Flex key={index} align="center" mb={2}>
                <Box width="12px" height="12px" borderRadius="50%" bg={categoryColors[event.category] || categoryColors['Other']} mr={2} />
                <Text>{event.name}</Text>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomCalendar;

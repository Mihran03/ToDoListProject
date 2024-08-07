import React, { useState } from 'react';
import { Calendar as RSuiteCalendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {
  Box, useColorModeValue, Text, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, useDisclosure
} from '@chakra-ui/react';
import { useCalendarInfo } from './CalendarInfoContext';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());
  const calendarBg = useColorModeValue('white', 'gray.700');
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
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        padding: '4px' // Add some padding for spacing
      }}>
        
        {dayEvents.length > 0 && (
          <>
            {dayEvents.slice(0, 2).map((event, index) => (
              <Text key={index} fontSize="xs" style={{ color: 'gray', marginTop: '2px' }}>{event.name}</Text>
            ))}
            {dayEvents.length > 2 && (
              <Button size="xs" onClick={() => openEventModal(date)} style={{ marginTop: '4px' }}>
                See More
              </Button>
            )}
          </>
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
              <Text key={index} mb={2}>{event.name}</Text>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomCalendar;

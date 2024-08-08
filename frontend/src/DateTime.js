import { useEffect, useState } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = format(dateTime, "eeee, MMMM d'th' yyyy");

  return (
    <Box p={5} position="relative" minHeight="200px">
      <Text fontSize="3xl" fontWeight='bold' color="gray.200">{formattedDate}</Text>
      <Text fontSize="2xl" color="gray.200">{dateTime.toLocaleTimeString()}</Text>
      <Button onClick={onOpen} colorScheme="blue" position="absolute" right="10px" bottom="10px" zIndex="1">Clock Mode</Button>
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" width="100vw" height="100vh" maxWidth="100vw">
          <ModalCloseButton />
          <ModalBody textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <div style={{ width: '50vw', height: '50vw', maxWidth: '500px', maxHeight: '500px', minWidth: '100px', minHeight: '100px', borderColor: 'white' }}>
              <Clock 
                value={dateTime} 
                size="100%" 
                className="custom-clock" // Ensure your CSS targets this class if using external styles
                renderNumbers={true} 
                renderSecondHand={true}
                secondHandWidth={2}
                hourMarksWidth={4}
                minuteMarksWidth={2}
                hourHandWidth={8}
                minuteHandWidth={5}
                secondHandLength={70}
                hourHandLength={50}
                minuteHandLength={70}
                hourHandColor="#bdbdbd"
                minuteHandColor="#bdbdbd"
                secondHandColor="#ff3e00"
              />
            </div>
            <Text mt={4} fontSize="4xl">{dateTime.toLocaleTimeString()}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateTime;

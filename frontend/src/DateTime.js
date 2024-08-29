import { useEffect, useState } from 'react';
import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, IconButton } from '@chakra-ui/react';
import { format } from 'date-fns';
import { RepeatIcon } from '@chakra-ui/icons';

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

  // Function to reload the page
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Box p="1.25rem" position="relative" minHeight="12.5rem">
      <Text fontSize="2xl" fontWeight="bold" color="gray.200">{formattedDate}</Text>
      <Text fontSize="1.5rem" color="gray.200">{dateTime.toLocaleTimeString()}</Text>
      <Button onClick={onOpen} position="absolute" right="0.625rem" bottom="0.625rem" zIndex="1">Clock Mode</Button>
      <IconButton
        icon={<RepeatIcon />}
        aria-label="Reload page"
        onClick={reloadPage}
        position="absolute"
        left="0.625rem"
        bottom="0.625rem"
        zIndex="1"
        width='4rem'
        height="2.5rem"
      />
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="black"
          color="white"
          width="100vw"
          height="100vh"
          maxWidth="100vw"
        >
          <ModalCloseButton />
          <ModalBody
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="7xl" fontFamily="monospace">
              {dateTime.toLocaleTimeString()}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DateTime;

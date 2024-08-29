import React, { useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Spinner } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { useCalendarInfo } from './CalendarInfoContext';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const categoryColors = {
  'Work': '#FFD700',  // Yellow
  'Family': '#800080',  // Purple
  'Personal': '#FF0000',  // Red
  'Other': '#E0E0E0'    // Grey
};

const MotionTr = motion.tr;

const CalendarInfo = () => {
  const { calendarInfo, loading } = useCalendarInfo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNotes, setSelectedNotes] = useState('');

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height="full">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );

  const handleExpandClick = (notes) => {
    setSelectedNotes(notes);
    onOpen();
  };

  return (
    <Box p="1.25rem" h="full" overflowY="auto" position="relative">
      <Text fontSize="2xl" fontWeight="bold" mb="1rem">Calendar Events</Text>
      <Table size="md">
        <Thead>
          <Tr>
            <Th color="white">Name</Th>
            <Th color="white">Date</Th>
            <Th color="white">Category</Th>
            <Th color="white"></Th> {/* Empty column for the expand button */}
          </Tr>
        </Thead>
        <Tbody>
          {calendarInfo.map((info, index) => {
            const name = info.properties.Name.title[0].plain_text;
            const date = info.properties.Date.date.start;
            const category = info.properties.Category?.select?.name;
            const notes = info.properties.Notes?.rich_text[0]?.plain_text || "No additional notes";

            const categoryName = category ? category : 'Other';
            const formattedDate = format(parseISO(date), 'MM/dd/yyyy');

            return (
              <MotionTr
                key={info.id}
                initial={{ opacity: 0, y: '1.25rem' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{name}</Td>
                <Td>{formattedDate}</Td>
                <Td>
                  <Box
                    display="inline-block"
                    width="0.75rem"
                    height="0.75rem"
                    borderRadius="50%"
                    bg={categoryColors[categoryName] || categoryColors['Other']}
                  />
                  <Text ml="0.5rem" display="inline">{categoryName}</Text>
                </Td>
                <Td>
                  <IconButton
                    icon={<FiExternalLink />}
                    onClick={() => handleExpandClick(notes)}
                    aria-label="Expand Notes"
                    variant="outline"
                    color="white"
                    size="sm"
                  />
                </Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent
          shadow="2xl"
          borderWidth="0.0625rem"
          borderColor="rgba(40, 47, 80, 0.7)"
          borderRadius="0.5rem"
          bg="rgba(40, 55, 80, 0.9)"
          color="white">
          <ModalHeader>Event Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedNotes}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CalendarInfo;

import React from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { AiOutlineArrowsAlt } from 'react-icons/ai';
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

  if (loading) return <Text>Loading...</Text>;

  return (
    <Box p={5} h="full" overflowY="auto" position="relative">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Calendar Events</Text>
      <IconButton
        icon={<AiOutlineArrowsAlt />}
        position="absolute"
        top={4}
        right={4}
        onClick={onOpen}
        aria-label="Open Table"
        variant="outline"
      />
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {calendarInfo.filter(info => 
            info.properties.Name.title.length > 0 && 
            info.properties.Date.date && 
            info.properties.Date.date.start
          ).map((info, index) => {
            const name = info.properties.Name.title[0].plain_text;
            const date = info.properties.Date.date.start;
            const category = info.properties.Category?.select?.name;

            // Explicitly handle null or undefined category
            const categoryName = category ? category : 'Other';

            // Parse and format the date
            const formattedDate = format(parseISO(date), 'MM/dd/yyyy');

            return (
              <MotionTr
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{name}</Td>
                <Td>{formattedDate}</Td>
                <Td>
                  <Box
                    display="inline-block"
                    width="12px"
                    height="12px"
                    borderRadius="50%"
                    bg={categoryColors[categoryName] || categoryColors['Other']}
                  />
                  <Text ml={2} display="inline">{categoryName}</Text>
                </Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Calendar Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="500px" overflowY="auto" className="scrollbar">
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Date</Th>
                  <Th>Category</Th>
                </Tr>
              </Thead>
              <Tbody>
                {calendarInfo.filter(info => 
                  info.properties.Name.title.length > 0 && 
                  info.properties.Date.date && 
                  info.properties.Date.date.start
                ).map((info, index) => {
                  const name = info.properties.Name.title[0].plain_text;
                  const date = info.properties.Date.date.start;
                  const category = info.properties.Category?.select?.name;

                  // Explicitly handle null or undefined category
                  const categoryName = category ? category : 'Other';

                  // Parse and format the date
                  const formattedDate = format(parseISO(date), 'MM/dd/yyyy');

                  return (
                    <Tr key={info.id}>
                      <Td>{name}</Td>
                      <Td>{formattedDate}</Td>
                      <Td>
                        <Box
                          display="inline-block"
                          width="12px"
                          height="12px"
                          borderRadius="50%"
                          bg={categoryColors[categoryName] || categoryColors['Other']}
                        />
                        <Text ml={2} display="inline">{categoryName}</Text>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CalendarInfo;

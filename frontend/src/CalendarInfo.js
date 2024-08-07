import React, { useEffect } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useCalendarInfo } from './CalendarInfoContext';
import { motion } from 'framer-motion';

const categoryColors = {
  'Work': '#FFD700',  // Yellow
  'Family': '#800080',  // Purple
  'Personal': '#FF0000',  // Red
  'Other': '#E0E0E0'    // Grey
};

const MotionTr = motion.tr;

const CalendarInfo = () => {
  const { calendarInfo, setCalendarInfo } = useCalendarInfo();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/calendar_info/')
      .then(response => response.json())
      .then(data => setCalendarInfo(data.calendar_info))
      .catch(error => console.error('Error fetching calendar info:', error));
  }, [setCalendarInfo]);

  return (
    <Box p={5} h="full" overflowY="auto">
      <Text fontSize="2xl" mb={4}>Calendar Events</Text>
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
            // Ensuring that category defaults to 'Other' if it is null or not assigned
            const categoryName = (info.properties.Category && info.properties.Category.select && info.properties.Category.select.name) || 'Other';
            return (
              <MotionTr
                key={info.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{name}</Td>
                <Td>{new Date(date).toLocaleDateString()}</Td>
                <Td>
                  <Box
                    display="inline-block"
                    width="12px"
                    height="12px"
                    borderRadius="50%"
                    bg={categoryColors[categoryName]}
                  />
                  <Text ml={2} display="inline">{categoryName}</Text>
                </Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalendarInfo;

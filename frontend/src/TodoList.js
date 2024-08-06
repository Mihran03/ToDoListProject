// src/components/TodoList.js
import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';
import { useTasks } from './TaskContext.js';
import { motion } from 'framer-motion';

// Define colors for different statuses
const statusColors = {
  'Not Started': '#FF6384',
  'In Progress': '#36A2EB',
  'Completed': '#4BC0C0',
  'Unassigned': '#E0E0E0' // Add color for unassigned status
};

// Motion.tr component
const MotionTr = motion.tr;

const TodoList = () => {
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    fetch('http://localhost:8000/api/todo/')
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [setTasks]);

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="2xl" mb={4}>To-Do List</Text>
      <Box maxHeight="400px" overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task, index) => {
              const status = task.properties['Status']?.select?.name || 'Unassigned';
              return (
                <MotionTr
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Td>{task.properties.Title.title[0].plain_text}</Td>
                  <Td>
                    <Box
                      display="inline-block"
                      width="12px"
                      height="12px"
                      borderRadius="50%"
                      bg={statusColors[status]}
                    />
                    <Text ml={2} display="inline">{status}</Text>
                  </Td>
                </MotionTr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TodoList;

// src/components/TodoList.js
import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';
import { useTasks } from './TaskContext.js';

// Define colors for different statuses
const statusColors = {
  'Not Started': '#FF6384',
  'In Progress': '#36A2EB',
  'Completed': '#4BC0C0'
};

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
      <Text fontSize="2xl">To-Do List</Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map(task => (
            <Tr key={task.id}>
              <Td>{task.properties.Title.title[0].plain_text}</Td>
              <Td>
                <Box
                  display="inline-block"
                  width="12px"
                  height="12px"
                  borderRadius="50%"
                  bg={statusColors[task.properties['Status'].select.name] || 'gray.300'}
                />
                <Text ml={2} display="inline">{task.properties['Status'].select.name}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TodoList;

import React, { useEffect } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { AiOutlineArrowsAlt } from 'react-icons/ai';
import { useTasks } from './TaskContext';
import { motion } from 'framer-motion';

const statusColors = {
  'Not Started': '#FF6384',
  'In Progress': '#36A2EB',
  'Completed': '#4BC0C0',
  'Unassigned': '#E0E0E0'
};

const MotionTr = motion.tr;

const TodoList = () => {
  const { tasks, setTasks } = useTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch('http://localhost:8000/api/todo/')
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }, [setTasks]);

  return (
    <Box p="1.25rem" h="full" overflowY="auto" position="relative">
      <Text fontSize="1.25rem" fontWeight="bold" mb="1rem">To-Do List</Text>
      <IconButton
        icon={<AiOutlineArrowsAlt />}
        position="absolute"
        top="1rem"
        right="1rem"
        onClick={onOpen}
        aria-label="Open Table"
        variant="outline"
        color='white'
      />
      <Table size="md">
        <Thead>
          <Tr>
            <Th color='white' fontSize="1rem">Title</Th>
            <Th color='white' fontSize="1rem">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.filter(task => task.properties.Title.title[0]?.plain_text).map((task, index) => {
            const status = task.properties['Status']?.select?.name || 'Unassigned';
            const name = task.properties.Title.title[0]?.plain_text;
            return (
              <MotionTr
                key={task.id}
                initial={{ opacity: 0, y: '1.25rem' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td fontSize="1rem">{name}</Td>
                <Td fontSize="1rem">
                  <Box
                    display="inline-block"
                    width="0.75rem"
                    height="0.75rem"
                    borderRadius="50%"
                    bg={statusColors[status]}
                  />
                  <Text ml="0.5rem" display="inline">{status}</Text>
                </Td>
              </MotionTr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          shadow="2xl"
          borderWidth="0.0625rem"
          borderColor="rgba(40, 47, 80, 0.7)"
          borderRadius="0.5rem"
          bg="rgba(40, 55, 80, 0.9)"
          color="white"
        >
          <ModalHeader fontSize="1.125rem">To-Do List Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="31.25rem" overflowY="auto" className="scrollbar">
            <Table size="md">
              <Thead>
                <Tr>
                  <Th color='white' fontSize="1rem">Title</Th>
                  <Th color='white' fontSize="1rem">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.filter(task => task.properties.Title.title[0]?.plain_text).map(task => (
                  <Tr key={task.id}>
                    <Td fontSize="1rem">{task.properties.Title.title[0]?.plain_text}</Td>
                    <Td fontSize="1rem">
                      <Box
                        display="inline-block"
                        width="0.75rem"
                        height="0.75rem"
                        borderRadius="50%"
                        bg={statusColors[task.properties['Status']?.select?.name || 'Unassigned']}
                      />
                      <Text ml="0.5rem" display="inline">{task.properties['Status']?.select?.name || 'Unassigned'}</Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TodoList;
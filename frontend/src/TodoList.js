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
    <Box p={5} h="full" overflowY="auto" position="relative">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>To-Do List</Text>
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
            <Th>Title</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.filter(task => task.properties.Title.title[0]?.plain_text).map((task, index) => {
            const status = task.properties['Status']?.select?.name || 'Unassigned';
            const name = task.properties.Title.title[0]?.plain_text;
            return (
              <MotionTr
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Td>{name}</Td>
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>To-Do List Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="500px" overflowY="auto" className="scrollbar">
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.filter(task => task.properties.Title.title[0]?.plain_text).map(task => (
                  <Tr key={task.id}>
                    <Td>{task.properties.Title.title[0]?.plain_text}</Td>
                    <Td>
                      <Box
                        display="inline-block"
                        width="12px"
                        height="12px"
                        borderRadius="50%"
                        bg={statusColors[task.properties['Status']?.select?.name || 'Unassigned']}
                      />
                      <Text ml={2} display="inline">{task.properties['Status']?.select?.name || 'Unassigned'}</Text>
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

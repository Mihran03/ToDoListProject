import React, { useState, useEffect } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Spinner } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { useTasks } from './TaskContext';
import { motion } from 'framer-motion';

const TodoList = () => {
  const { tasks, setTasks } = useTasks();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const MotionTr = motion.tr;

  useEffect(() => {
    fetch('http://localhost:8000/api/todo/')
      .then(response => response.json())
      .then(data => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, [setTasks]);

  const handleExpandClick = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height="full">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );

  return (
    <Box p="1.25rem" h="full" overflowY="auto" position="relative">
      <Text fontSize="1.25rem" fontWeight="bold" mb="1rem">To-Do List</Text>
      <Table size="md">
        <Thead>
          <Tr>
            <Th color='white' fontSize="1rem">Title</Th>
            <Th color='white' fontSize="1rem">Status</Th>
            <Th color='white' fontSize="1rem">Expand</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task, index) => {
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
                    bg={['#FF6384', '#36A2EB', '#4BC0C0', '#E0E0E0'][Math.floor(Math.random() * 4)]}
                  />
                  <Text ml="0.5rem" display="inline">{status}</Text>
                </Td>
                <Td>
                  <IconButton
                    icon={<FiExternalLink />}
                    onClick={() => handleExpandClick(task)}
                    aria-label="Expand Task"
                    variant="outline"
                    color="white"
                  />
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
          <ModalHeader fontSize="1.125rem">Task Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="31.25rem" overflowY="auto">
            {selectedTask && (
              <>
                <Text fontSize="1.25rem" fontWeight="bold">{selectedTask.properties.Title.title[0]?.plain_text}</Text>
                <Text mt="1rem">{selectedTask.properties['Notes']?.rich_text[0]?.plain_text || "No notes available."}</Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TodoList;

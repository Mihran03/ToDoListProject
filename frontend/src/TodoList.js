// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Button, List, ListItem, Checkbox, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks from the server
    axios.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;

    axios.post('/api/tasks', { title: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Box>
      <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
        mb={2}
      />
      <Button onClick={addTask}>Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <Checkbox mr={2} />
            {task.title}
            <IconButton
              aria-label="Delete task"
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => deleteTask(task.id)}
              ml="auto"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;

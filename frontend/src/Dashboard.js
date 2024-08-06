// src/components/Dashboard.js
import React from 'react';
import { Box, Grid, IconButton } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ToDoList from './TodoList';
import DateTime from './DateTime';
import Weather from './Weather';
import StatusChart from './StatusChart';
import Calendar from './Calendar';

// Motion.div components for animating
const MotionBox = motion(Box);

const Dashboard = () => {
  const handleReload = () => {
    window.location.reload();
  };


  return (
    <Grid templateColumns="repeat(4, 1fr)" templateRows='repeat(2, 1fr)' gap={6} p={6}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DateTime />
      </MotionBox>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Weather />
      </MotionBox>
      <MotionBox
        gridRow={{span: 2}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ToDoList />
      </MotionBox>
      <MotionBox
        gridRow={{span: 2}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <StatusChart />
      </MotionBox>
      <MotionBox
        
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Calendar />
      </MotionBox>
      <Box  textAlign="center">
        <IconButton
          icon={<RepeatIcon />}
          onClick={handleReload}
          aria-label="Reload"
          colorScheme="teal"
          size="lg"
        />
      </Box>
    </Grid>
  );
};

export default Dashboard;

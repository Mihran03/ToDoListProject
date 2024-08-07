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
import {SimpleGrid, GridItem } from '@chakra-ui/react';

// Motion.div components for animating
const MotionBox = motion(Box);

const Dashboard = () => {
  const handleReload = () => {
    window.location.reload();
  };


  return (
    <Grid
  h='900px'
  templateRows='repeat(4, 1fr)'
  templateColumns='repeat(4, 1fr)'
  gap={4}
  padding={10}
>
  <GridItem rowSpan={1} colSpan={1} shadow="md" borderWidth="1px"> 
  <DateTime />
  </GridItem>
  <GridItem colSpan={1} rowSpan={1}  shadow="md" borderWidth="1px" >
  <Weather />
    </GridItem>
    <GridItem colSpan={1} rowSpan={2} shadow="md" borderWidth="1px" overflow="hidden">
  <StatusChart />
</GridItem>

  <GridItem colSpan={1} rowSpan={5} shadow="md" borderWidth="1px" overflow="hidden">
  <ToDoList />
</GridItem>
  <GridItem colSpan={2} rowSpan={4} borderRadius="md" borderWidth="1px" boxShadow="md" overflow="hidden">
  <Calendar />
</GridItem>
  <GridItem rowSpan={3} bg='purple' />
</Grid>
    
  );
};

export default Dashboard;

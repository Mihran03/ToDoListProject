// src/components/Dashboard.js
import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ToDoList from './TodoList';
import DateTime from './DateTime';
import Weather from './Weather';
import StatusChart from './StatusChart';
import Calendar from './Calendar';
import CalendarInfo from './CalendarInfo';

// Motion.div component for animating
const MotionGrid = motion(Grid);
const MotionBox = motion(Box);

const Dashboard = () => {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 } // Speed up the transition
  };

  return (
    <MotionGrid
      h='100vh'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      padding={10}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } } // Speed up the stagger delay
      }}
      initial="hidden"
      animate="visible"
    >
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        rowSpan={1}
        colSpan={1}
        shadow="md"
        borderWidth="1px"
      >
        <DateTime />
      </MotionBox>
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        p={3}
        colSpan={1}
        rowSpan={1}
        shadow="md"
        borderWidth="1px"
      >
        <Weather />
      </MotionBox>
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        colSpan={1}
        rowSpan={2}
        shadow="md"
        borderWidth="1px"
        overflow="hidden"
      >
        <StatusChart />
      </MotionBox>
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        colSpan={1}
        rowSpan={5}
        shadow="md"
        borderWidth="1px"
        overflow="hidden"
      >
        <ToDoList />
      </MotionBox>
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        colSpan={2}
        rowSpan={4}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        overflow="hidden"
      >
        <Calendar />
      </MotionBox>
      <MotionBox
        as={GridItem}
        {...animationProps}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.3 }} // Speed up the transition
        rowSpan={3}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        overflow="hidden"
      >
        <CalendarInfo />
      </MotionBox>
    </MotionGrid>
  );
};

export default Dashboard;

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
  // Base animation properties
  const baseAnimationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  // Updated styling with translucency
  const boxStyle = {
    shadow: '2xl', // Enhanced shadow effect
    borderWidth: '1px',
    borderColor: 'rgba(40, 47, 80, 0.0)', // Adjust the border color to match the theme
    borderRadius: 'lg', // Rounded corners
    bg: 'rgba(0, 0, 0, 0.3)', // Using RGBA for translucency, adjust the color as needed
    color: 'white', // Text color for better visibility on dark background
    p: 4 // Padding around the content inside the box
  };

  return (
    <MotionGrid
      h='100vh'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      padding={7}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
      initial="hidden"
      animate="visible"
    >
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.1}} {...boxStyle} rowSpan={1} colSpan={1}>
        <DateTime />
      </MotionBox>
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.2}} {...boxStyle} colSpan={1} rowSpan={1}>
        <Weather />
      </MotionBox>
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.3}} {...boxStyle} colSpan={1} rowSpan={2}>
        <StatusChart />
      </MotionBox>
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.4}} {...boxStyle} colSpan={1} rowSpan={5}>
        <ToDoList />
      </MotionBox>
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.5}} {...boxStyle} colSpan={2} rowSpan={4}>
        <Calendar />
      </MotionBox>
      <MotionBox as={GridItem} {...baseAnimationProps} transition={{...baseAnimationProps.transition, delay: 0.6}} {...boxStyle} rowSpan={3}>
        <CalendarInfo />
      </MotionBox>
    </MotionGrid>
  );
};

export default Dashboard;

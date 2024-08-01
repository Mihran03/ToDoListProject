// src/components/StatusChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useTasks } from './TaskContext.js';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatusChart = () => {
  const { tasks } = useTasks();

  if (!tasks || tasks.length === 0) {
    return <p>No tasks available to display.</p>;
  }

  // Count status occurrences
  const statusCount = tasks.reduce((acc, task) => {
    const status = task.properties['Status'].select.name;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'], // Customize colors as needed
      },
    ],
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
    
      <h2>Status Chart</h2>
      <Pie data={data} />
    
    </Box>
  );
};

export default StatusChart;

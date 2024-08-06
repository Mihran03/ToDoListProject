// src/components/StatusChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useTasks } from './TaskContext.js';
import { Box, Text } from '@chakra-ui/react';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatusChart = () => {
  const { tasks } = useTasks();

  if (!tasks || tasks.length === 0) {
    return <Text>No tasks available to display.</Text>;
  }

  // Count status occurrences
  const statusCount = tasks.reduce((acc, task) => {
    const status = task.properties?.['Status']?.select?.name || 'Unassigned';
    if (status) {
      acc[status] = (acc[status] || 0) + 1;
    } else {
      console.warn('Task status is null or undefined:', task);
    }
    return acc;
  }, {});

  // Remove 'Unassigned' from the pie chart dataset
  const { Unassigned, ...filteredStatusCount } = statusCount;

  if (Object.keys(filteredStatusCount).length === 0) {
    return <Text>All tasks have an invalid or missing status.</Text>;
  }

  const data = {
    labels: Object.keys(filteredStatusCount),
    datasets: [
      {
        data: Object.values(filteredStatusCount),
        backgroundColor: ['#FF6384', '#4BC0C0', '#36A2EB'], // Customize colors as needed
      },
    ],
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text fontSize="xl">Status Chart</Text>
      <Pie data={data} />
    </Box>
  );
};

export default StatusChart;

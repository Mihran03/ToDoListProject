import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useTasks } from './TaskContext.js';
import { Box, Text } from '@chakra-ui/react';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatusChart = () => {
  const { tasks } = useTasks();

  if (!tasks || tasks.length === 0) {
    return ;
  }

  const statusCount = tasks.reduce((acc, task) => {
    const status = task.properties?.['Status']?.select?.name || 'Unassigned';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const { Unassigned, ...filteredStatusCount } = statusCount;

  if (Object.keys(filteredStatusCount).length === 0) {
    return <Box p={2}><Text>All tasks have an invalid or missing status.</Text></Box>;
  }

  const data = {
    labels: Object.keys(filteredStatusCount),
    datasets: [
      {
        data: Object.values(filteredStatusCount),
        backgroundColor: ['#FF6384', '#4BC0C0', '#36A2EB'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents distortion
    plugins: {
      legend: {
        position: 'top', // Adjust the legend position if needed
      }
    }
  };

  return (
    <Box p={2}  h="90%" w="100%">
      <Text fontSize="xl" mb={2}>Status Chart</Text>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default StatusChart;

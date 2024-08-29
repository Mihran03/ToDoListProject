import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useTasks } from './TaskContext';
import { Box, Text, Spinner } from '@chakra-ui/react';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatusChart = () => {
  const { tasks } = useTasks();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => setLoading(false), 2000); // Simulate a fetch
  }, []);

  if (loading) return (
    <Box display="flex" alignItems="center" justifyContent="center" height="full">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );

  if (!tasks || tasks.length === 0) {
    return null; // Return null instead of empty return
  }

  const statusCount = tasks.reduce((acc, task) => {
    const status = task.properties?.['Status']?.select?.name || 'Unassigned';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ['#4BC0C0','#FF6384',  '#36A2EB'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevents distortion
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Set legend text color to white
          font: {
            size: 12 // Make legend text smaller
          }
        }
      }
    }
  };

  return (
    <Box p="0.5rem" h="80%" w="100%">
      <Text fontSize="1.5rem" p="0.5rem" mb="0.5rem" fontWeight="bold">Status Chart</Text>
      <Pie data={data} options={options} height={200} width={200} />
    </Box>
  );
};

export default StatusChart;

// src/components/Dashboard.js
import { Box, Grid } from '@chakra-ui/react';
import ToDoList from './TodoList';
import DateTime from './DateTime';
import Weather from './Weather';
import StatusChart from './StatusChart';

const Dashboard = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} p={6}>
      <Box>
        <DateTime />
      </Box>
      <Box>
        <Weather />
      </Box>
      <Box>
        <ToDoList />
      </Box>
      <Box>
        <StatusChart />
      </Box>
    </Grid>
  );
};

export default Dashboard;

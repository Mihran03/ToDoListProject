import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { TaskProvider } from './TaskContext.js';
import { CalendarInfoProvider } from './CalendarInfoContext.js';
ReactDOM.render(
  <ChakraProvider>
  <TaskProvider>
  <CalendarInfoProvider>
    <App />
    </CalendarInfoProvider>
    </TaskProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

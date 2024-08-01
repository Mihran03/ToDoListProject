import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { TaskProvider } from './TaskContext.js';
ReactDOM.render(
  <ChakraProvider>
  <TaskProvider>
    <App />
    </TaskProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

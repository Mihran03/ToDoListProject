import React from 'react';
import './App.css';
import logo from './logo.svg';
import TodoList from './TodoList.js';  // Import TodoList component


function App() {
  return (
    <div className="App">
      
      <TodoList />  // Include TodoList component in your App
    </div>
  );
}

export default App;

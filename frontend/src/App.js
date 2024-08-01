import React from 'react';
import './App.css';
import logo from './logo.svg';
import TodoList from './TodoList.js';  // Import TodoList component
import Dashboard from './Dashboard.js';

function App() {
  return (
    <div className="App">

    <Dashboard />
      {/*
      <TodoList />
        */}
    </div>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';
import React from 'react';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

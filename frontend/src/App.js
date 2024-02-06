import 'react-toastify/dist/ReactToastify.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import React from 'react';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
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
      <ToastContainer />
    </>
  );
}

export default App;

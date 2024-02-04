import React, { useEffect } from 'react';

import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user.user && user.user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>
      <TaskForm />
    </>
  );
};

export default Dashboard;

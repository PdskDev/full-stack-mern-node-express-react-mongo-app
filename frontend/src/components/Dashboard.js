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
        <h1>Welcome {(!!user && !!user.user.name) ? user.user.name : ''}</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='btn' onClick={() => navigate('/alltasks')}>
            View my all Todos
          </button>
        </div>
      </section>
      <TaskForm />
    </>
  );
};

export default Dashboard;

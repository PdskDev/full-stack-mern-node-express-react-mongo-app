import React from 'react';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';

const TaskItem = ({ task }) => {
  return (
    <>
      <div className='task' style={{ height: '150' }}>
        <div style={{ height: '10', fontSize: 12 }}>
          {new Date(task.createdAt).toLocaleString('fr-FR')}
        </div>
        <h2 style={{ height: 80 }}>{task.title} </h2>
        <div style={{ height: 30 }}>
          <Switch
            name='isDoneCheckbox'
            checked={task.isDone}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>
    </>
  );
};

export default TaskItem;

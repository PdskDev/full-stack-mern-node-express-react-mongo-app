import React from 'react';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';

const TaskItem = ({ task }) => {
  return (
    <div className='task'>
      <div>{new Date(task.createdAt).toLocaleString('fr-FR')}</div>
      <h2>{task.title}</h2>
      <span>
        <Switch
          name='isDoneCheckbox'
          checked={task.isDone}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </span>
    </div>
  );
};

export default TaskItem;

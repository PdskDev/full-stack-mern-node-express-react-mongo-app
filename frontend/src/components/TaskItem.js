import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Switch from '@mui/material/Switch';
import { deleteTask } from '../features/tasks/taskSlice';
import { useDispatch } from 'react-redux';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  return (
    <div className='task' style={{ height: 150, width: 150 }}>
      <div style={{ height: '10', fontSize: 12 }}>
        {new Date(task.createdAt).toLocaleString('fr-FR')}
      </div>
      <h2 style={{ height: 80 }}>{task.title} </h2>
      <div style={{ height: 30 }}>
        <Switch
          name='isDoneCheckbox'
          checked={task.isDone}
          inputProps={{ 'aria-label': 'controlled' }}
          size='small'
        />
        <IconButton
          aria-label='delete'
          onClick={() => dispatch(deleteTask(task._id))}
          size='small'
          color='error'
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskItem;

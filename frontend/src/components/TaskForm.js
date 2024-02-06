import React, { useState } from 'react';

import Switch from '@mui/material/Switch';
import { createTask } from '../features/tasks/taskSlice';
import { useDispatch } from 'react-redux';

//import { useDispatch } from 'react-redux';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [isDone, setIsDone] = useState(false);
  const dispatch = useDispatch();

  const checkBoxHandler = (e) => {
    setIsDone(!isDone);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createTask({ title, isDone }));
    setTitle('');
    setIsDone(false);
  };
  return (
    <section className='form'>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='title'>To Do</label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='isDoneCheckbox'>
            Is Done ?
            <Switch
              name='isDoneCheckbox'
              checked={isDone}
              onChange={checkBoxHandler}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </label>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Save
          </button>
        </div>
      </form>
    </section>
  );
};
export default TaskForm;

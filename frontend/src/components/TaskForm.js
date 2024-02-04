import React, { useState } from 'react';

//import { useDispatch } from 'react-redux';

const TaskForm = () => {
  const [title, setTitle] = useState();
  const [isDone, setIsDone] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setTitle('');
  };
  return (
    <section className='form'>
      <form onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <label htmlFor='title'>Task</label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='isDone-true'>Is Completed ?</label>
          <div class='switch-field'>
            <input
              type='radio'
              id='isDone-true'
              name='isDone'
              value='true'
              onClick={(e) => setIsDone(e.target.value)}
            />
            <label htmlFor='isDone-false'>Yes</label>
            <input
              type='radio'
              id='isDone-false'
              name='isDone'
              value='false'
              checked={true}
              onClick={(e) => setIsDone(e.target.value)}
            />
            <label for='radio-two'>No</label>
          </div>
        </div>
      </form>
    </section>
  );
};
export default TaskForm;

import React, { useEffect } from 'react';
import { getTasks, reset } from '../features/tasks/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from './Spinner';
import TaskItem from './TaskItem';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getTasks());
    return () => dispatch(reset());
  }, [navigate, dispatch, isError, message]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className='content'>
      {tasks.length > 0 && (
        <>
          <div className='tasks'>
            {tasks.map((taskItem) => (
              <>
                {Array.from(taskItem).map((taskData, idx) => (
                  <TaskItem key={idx} task={taskData} />
                ))}
              </>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default TaskList;

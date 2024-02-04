import React, { useEffect, useState } from 'react';
import { login, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FaSignInAlt } from 'react-icons/fa';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const disptach = useDispatch();

  const { user, isLoading, isError, IsSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (IsSuccess || user) navigate('/');
    disptach(reset());
  }, [IsSuccess, disptach, isError, message, navigate, user]);

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const userData = { email, password };
    disptach(login(userData));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start creating tasks</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmitHandler}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChangeHandler}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' id='submitButton'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

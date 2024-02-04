import React, { useEffect, useState } from 'react';
import { register, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppMessage from '../messages/AppMessage';
import { FaUser } from 'react-icons/fa';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const { name, email, password, confirmPassword } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(AppMessage.register.error.password_different);
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmitHandler}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChangeHandler}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Please confirm your password'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block' id='submitButton'>
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;

import React, { useState } from 'react';

import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
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

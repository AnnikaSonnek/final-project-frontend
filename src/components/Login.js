/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from 'reducers/user';
import { API_URL } from '../utils/urls';
import './Login.css'

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// LOGIN ////////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const Login = () => {
  // State variables for login and registration
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMail, setLoginMail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMail, setRegisterMail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [mode] = useState('login');

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  // Check if user is already logged in, then redirect to home page
  useEffect(() => {
    if (accessToken) {
      navigate('/todopage');
    }
  }, [accessToken]);

  // Handle login form submission
  const onLoginFormSubmit = (event) => {
    event.preventDefault();

    // Prepare request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ mail: loginMail, password: loginPassword })
    };

    // Send login request to the server
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response)
          // Update user state with access token, username, and user ID
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setAvatar(data.response.avatar));
          dispatch(user.actions.setCheckedTasks(data.response.checkedTasks))
          dispatch(user.actions.setError(null));
          navigate('/todopage'); // Redirect to home page
        } else {
          console.log(data.response)
          // Handle login error
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  // Handle registration form submission
  const onRegisterFormSubmit = (event) => {
    event.preventDefault();

    // Prepare request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mail: registerMail, username: registerUsername, password: registerPassword })
    };

    // Send registration request to the server
    fetch(API_URL('register'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response)
          // Update user state with access token, username, and user ID
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
          navigate('/todopage'); // Redirect to home page
        } else {
          console.log(data.response)
          // Handle registration error
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <div className="wrap">
      <input type="checkbox" id="form_switch" style={{ display: 'none' }} />
      <div className="flipcard">
        <div className="flipcard-inner">
          <div className="flipcard-front">
            <form className="login-form" action="" onSubmit={onLoginFormSubmit}>
              <div className="form-header">
                <h3>Login Form</h3>
                <p>Login to access your dashboard</p>
              </div>
              <div className="form-group">
                <input
                  className="login-input"
                  type="text"
                  name="mail"
                  placeholder="Mail"
                  autoComplete="off"
                  value={loginMail}
                  onChange={(event) => setLoginMail(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                <button
                  className="form-button"
                  type="submit">Login
                </button>
              </div>
              <div className="form-footer">
              Dont have an account? <label className="label-highlight" htmlFor="form_switch"> Sign Up </label>
              </div>
            </form>
          </div>
          <div className="flipcard-back">
            <form className="login-form" action="" onSubmit={onRegisterFormSubmit}>
              <div className="form-header">
                <h3>Signup Form</h3>
                <p>Register for a new account</p>
              </div>
              <div className="form-group">
                <input
                  className="login-input"
                  type="text"
                  name="mail"
                  placeholder="Mail"
                  autoComplete="off"
                  value={registerMail}
                  onChange={(event) => setRegisterMail(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                <input
                  className="login-input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  value={registerUsername}//
                  onChange={(event) => setRegisterUsername(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                <input
                  className="login-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={registerPassword}
                  onChange={(event) => setRegisterPassword(event.target.value)}
                  required />
              </div>
              <div className="form-group">
                <button
                  className="form-button form-button-register"
                  type="submit">Signup
                </button>
              </div>
              <div className="form-footer">
              Already have an account? <label className="label-highlight" htmlFor="form_switch"> Login</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
};
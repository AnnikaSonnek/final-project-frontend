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
  const [mode, setMode] = useState('login');

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
        'Authorization': accessToken
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

  // Handle login button click
  const handleLoginButtonClick = () => {
    setMode('login');
  };

  // Handle register button click
  const handleRegisterButtonClick = () => {
    setMode('register');
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <div className="loginContainer">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Login form */}
        <div className="login">
          <form className="form" onSubmit={onLoginFormSubmit}>
            <label htmlFor="chk" aria-hidden="true">
                            Log in
            </label>
            <input
              className="input"
              type="text"
              name="mail"
              placeholder="Mail"
              autoComplete="off"
              value={loginMail}
              onChange={(event) => setLoginMail(event.target.value)}
              required />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              required />
            <button className="submitBtn" type="submit" value="Sign In" onClick={handleLoginButtonClick}>
                            Sign In
            </button>
          </form>
        </div>

        {/* Registration form */}
        <div className="register">
          <form className="form" onSubmit={onRegisterFormSubmit}>
            <label htmlFor="chk" aria-hidden="true">
                            Register
            </label>
            <input
              className="input"
              type="text"
              name="mail"
              placeholder="Mail"
              autoComplete="off"
              value={registerMail}
              onChange={(event) => setRegisterMail(event.target.value)}
              required />
            <input
              className="input"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              value={registerUsername}//
              onChange={(event) => setRegisterUsername(event.target.value)}
              required />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
              required />
            <button className="submitBtn" type="submit" value="Register" onClick={handleRegisterButtonClick}>
                            Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

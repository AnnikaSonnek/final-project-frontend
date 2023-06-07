/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';
import { API_URL } from '../utils/urls';

export const Navbar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();

  const onSelectAvatarSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ avatar: selectedAvatar })
    };

    fetch(API_URL('users/:id/avatar'), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        if (data.success) {
          console.log(data.response.avatar);
          dispatch(user.actions.setSelectedAvatar(data.response.avatar));
          dispatch(user.actions.setError(null));
        } else {
          console.log(data.response);
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(todos.actions.setItems([]));
  };

  const loggedInUser = useSelector((store) => store.user.username);
  const avatar = useSelector((store) => store.user.avatar);
  console.log(avatar);

  return (
    <>
      <form onSubmit={onSelectAvatarSubmit}>
        <label>
          <input
            type="radio"
            value="avatar1"
            checked={selectedAvatar === 'avatar1'}
            onChange={(event) => setSelectedAvatar(event.target.value)} />
          <img alt="avatar" src={avatar} />
        </label>
        <label>
          <input
            type="radio"
            value="avatar2"
            checked={selectedAvatar === 'avatar2'}
            onChange={(event) => setSelectedAvatar(event.target.value)} />
          Avatar 2
        </label>
        <button type="submit">Submit</button>
      </form>
      <img alt="avatar" src={avatar} />
      <h1>Hello {loggedInUser}!</h1>
      <button type="button" className="Btn" onClick={onLogoutButtonClick}>
        Logout
      </button>
    </>
  );
};

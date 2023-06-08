/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';

export const Navbar = () => {
  const loggedInUser = useSelector((store) => store.user.username);
  const avatar = useSelector((store) => store.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(todos.actions.setItems([]));
  };

  const onPersonalPageButtonClick = () => {
    navigate('/Personalpage');
  };

  return (
    <>
      <img alt="avatar" src={`../img/${avatar}`} />
      <h1>Hello {loggedInUser}!</h1>
      <button type="button" className="Btn" onClick={onLogoutButtonClick}>
        Logout
      </button>
      <button type="button" className="Btn" onClick={onPersonalPageButtonClick}>
        Personal Page
      </button>
    </>
  );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';

export const Navbar = () => {
  const dispatch = useDispatch(); // use the useDispatch hook inside a functional component

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(todos.actions.setItems([]));
  };

  const loggedInUser = useSelector((store) => store.user.username);

  return (
    <>
      <h1>
        Hello {loggedInUser}!
      </h1>
      <button
        type="button"
        className="Btn"
        onClick={onLogoutButtonClick}
      >
        Logout
      </button>
    </>
  );
};

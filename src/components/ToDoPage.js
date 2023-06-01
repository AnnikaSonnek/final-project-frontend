/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import required modules from React Redux
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';
import { PostTodos } from './PostTodos';
import { SeeTodos } from './SeeTodos';

export const ToDoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken]);

  const onLogoutButtonClick = () => {
    // Perform an action when the logout button is clicked
    dispatch(user.actions.setAccessToken(null)); // Clear the "accessToken" value in the Redux store
    dispatch(user.actions.setUsername(null)); // Clear the "username" value in the Redux store
    dispatch(user.actions.setUserId(null)); // Clear the "userId" value in the Redux store
    dispatch(user.actions.setError(null)); // Clear any previous error in the Redux store
    dispatch(todos.actions.setItems([])); // Set an empty array as the "items" value in the "thoughts" reducer
  };

  return (
    <>
      <button type="button" className="Btn" onClick={onLogoutButtonClick}>Logout</button>
      <p>Hej hej!</p>
      <PostTodos />
      <SeeTodos />
    </>
  )
}
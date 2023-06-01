/* eslint-disable max-len */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// POST TODOS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
export const PostTodos = () => {
  const dispatch = useDispatch(); // Here we use the dispatch function to dispatch actions.
  // const maxCharacters = 29; // Max amount of characters allowed in the input field.
  const accessToken = useSelector((store) => store.user.accessToken);

  const [newTodo, setNewTodo] = useState({
    description: '',
    deadline: '',
    category: '',
    priority: ''
  });

  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify(newTodo) // Convert the username and password to JSON string and set as the request body
    };
    fetch(API_URL('todos'), options) // Make a POST request to the API URL based on the current mode
      .then((response) => response.json()) // Convert the response to JSON
      .then((responsedata) => {
        if (responsedata.success) {
          console.log(responsedata);
          dispatch(user.actions.setError(null));
          setNewTodo({
            description: '',
            deadline: '',
            category: '',
            priority: ''
          }) // Dispatch an action to clear any previous error in the store
        } else {
          dispatch(user.actions.setError(responsedata.response)); // Dispatch an action to set the error message in the store
        }
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
  };
    // //////////////////////////////////////////////////////////////////////// //
    // ///////////////////////////// RETURN JSX /////////////////////////////// //
    // //////////////////////////////////////////////////////////////////////// //

  return (
    <>
      <p>skriv din todo här!</p>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleInputChange} />
        <input
          type="text"
          name="deadline"
          placeholder="Deadline"
          value={newTodo.deadline}
          onChange={handleInputChange} />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newTodo.category}
          onChange={handleInputChange} />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={newTodo.priority}
          onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}


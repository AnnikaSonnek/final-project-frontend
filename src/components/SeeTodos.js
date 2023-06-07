/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { todos } from '../reducers/todos';
import { API_URL } from '../utils/urls';
import './SeeTodos.css';

// //////////////////////////////////////////////////////////////////////// //
// ///////////////////////////// SEE TODOS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const SeeTodos = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken)
  const todoList = useSelector((store) => store.todos.items); // We fint the thoughts in the store and set them to the variable
  const [messageToDelete, setMessageToDelete] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)

  // //////////////////USE EFFECT FETCH ALL TODOS ///////////////////
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken // the accessToken is used for getting all the todos and display them for the user
      }
    };

    fetch(API_URL('todos'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If the fetch is successful the error is set to null and the items (which is the list of todos) is set to the response from the database, displaying all todos.
          dispatch(todos.actions.setError(null));
          dispatch(todos.actions.setItems(data.response));
        } else {
          // If the fetch is unsuccessful the error is set to the response that is returned from the server and the items(todoslist) is set to be an empty array.
          dispatch(todos.actions.setError(data.response));
          dispatch(todos.actions.setItems([]));
        }
      });
  })

  // //////////////////DELETE TODO //////////////////////

  const DeleteMessage = (deleteID) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      } // There is no need to send a when calling the likes-function
    };

    fetch(API_URL(`todos/${deleteID}`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessageToDelete(data.response._id);
          // Remove the deleted message from the message list
          console.log(messageToDelete)
        } else {
          console.error(data.message)
        }
      })
      .catch((error) => console.log(error))
  };

  // /////////// TOGGLE TODO /////////////////////

  const onToggleTodo = (todoId, completed) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !completed
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    };
    fetch(API_URL(`todos/${todoId}/completed`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(todos.actions.setError(null));
          console.log(data.response)
        } else {
          dispatch(todos.actions.setError(data.response));
        }
      });
  };

  const editTodo = (todoId) => {
    // Find the selected todo by its ID
    const selected = todoList.find((todo) => todo._id === todoId);
    if (selected) {
      setSelectedTodo(todoId);
    }
  };

  const backtoTodoList = () => {
    // Find the selected todo by its ID
    setSelectedTodo(null);
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <div className="wrap">
      {todoList.map((item) => (
        <div key={item._id} className="todo-container">
          <input type="checkbox" id="form_switch" style={{ display: 'none' }} />
          <div className="flipcard">
            <div className={`flipcard-inner${selectedTodo === item._id ? ' flipped' : ''}`}>
              <div className="flipcard-front">
                <form className="displayed-todo" action="">
                  <div className="form-group">
                    <div className="cards">
                      <input
                        type="checkbox"
                        name={item._id}
                        id={item._id}
                        checked={item.completed}
                        onChange={() => onToggleTodo(item._id, item.completed)} />
                      <p>{item.description}</p>
                      <p>{item.priority}</p>
                      <p>{item.category}</p>
                      <p>{item.createdAt}</p>
                      <p>{item.completed}</p>
                      <button type="button" onClick={() => DeleteMessage(item._id)}>Delete</button>
                      <div className="form-footer">
                      Do you want to edit this todo? <label className="label-highlight" htmlFor={`form_switch_${item._id}`} onClick={() => editTodo(item._id)}>EDIT</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flipcard-back">
                <form className="login-form" action="">
                  <div className="form-header">
                    <h3>EDIT TODO</h3>
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      name="description"
                      placeholder="Description" />
                    <button type="submit">Submit</button>
                  </div>
                  <div className="form-footer">
                  See updated todo <label className="label-highlight" htmlFor={`form_switch_${item._id}`} onClick={() => backtoTodoList()}>CLICK HERE</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
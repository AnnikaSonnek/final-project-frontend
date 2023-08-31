/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Login } from 'components/Login';
import { ToDoPage } from 'components/ToDoPage';
import { PersonalPage } from 'components/PersonalPage';
import { NotFound } from 'components/NotFound';
import { user } from './reducers/user';
import { todos } from './reducers/todos';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    todos: todos.reducer
  }); // Combine the user and thoughts reducers into a single reducer using the combineReducers function

  const store = configureStore({ reducer }) // Create the Redux store using the combined reducer

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}> </Route>
          <Route path="/todopage" element={<ToDoPage />}> </Route>
          <Route path="/personalpage" element={<PersonalPage />}> </Route>
          <Route path="*" element={<NotFound />} />
          {/* <Route path="*" element={<NotFound />}> </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import required modules from React Redux
import { PostTodos } from './PostTodos';
import { SeeTodos } from './SeeTodos';
import { Navbar } from './Navbar';

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// TODOPAGE /////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const ToDoPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  // A useEffect-hook that checks if the accessToken is valid
  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken]);

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <>
      <Navbar />
      <PostTodos />
      <SeeTodos />
    </>
  )
}
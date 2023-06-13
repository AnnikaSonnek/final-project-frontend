/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import required modules from React Redux
import { PostTodos } from './PostTodos';
import { SeeTodos } from './SeeTodos';
import { Navbar } from './Navbar';

export const ToDoPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken]);

  return (
    <>
      <Navbar />
      <p>Hej hej!</p>
      <PostTodos />
      <SeeTodos />
    </>
  )
}
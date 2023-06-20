/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from './Navbar';
import { AvatarPicker } from './AvatarPicker';
import { ProgressBar } from './ProgressBar';
import { Levels } from './Levels';

export const PersonalPage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);

  // A useEffect-hook that checks if the accessToken is valid
  useEffect(() => {
    if (!accessToken) {
      navigate('/')
    }
  }, [accessToken]);

  return (
    <>
      <Navbar />
      <Levels />
      <ProgressBar />
      <AvatarPicker />
    </>
  )
}
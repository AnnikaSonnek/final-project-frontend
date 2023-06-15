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
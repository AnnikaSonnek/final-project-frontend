import React from 'react';
import { Navbar } from './Navbar';
import { AvatarPicker } from './AvatarPicker';
import { ProgressBar } from './ProgressBar';
import { Levels } from './Levels';

export const PersonalPage = () => {
  return (
    <>
      <Navbar />
      <Levels />
      <ProgressBar />
      <AvatarPicker />
    </>
  )
}
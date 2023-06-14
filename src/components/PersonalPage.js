import React from 'react';
import { Navbar } from './Navbar';
import { AvatarPicker } from './AvatarPicker';
import { InputField } from './InputField';
import { ProgressBar } from './ProgressBar';
import { Levels } from './Levels';

export const PersonalPage = () => {
  return (
    <>
      <Navbar />
      <Levels />
      <ProgressBar />
      <AvatarPicker />
      <InputField />
    </>
  )
}
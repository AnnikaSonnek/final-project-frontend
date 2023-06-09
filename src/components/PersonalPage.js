import React from 'react';
import { Navbar } from './Navbar';
import { AvatarPicker } from './AvatarPicker';
import { InputField } from './InputField';

export const PersonalPage = () => {
  return (
    <>
      <Navbar />
      <AvatarPicker />
      <InputField />
    </>
  )
}
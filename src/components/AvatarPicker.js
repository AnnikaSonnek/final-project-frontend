/* eslint-disable jsx-a11y/label-has-associated-control */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from 'reducers/user';
import styled from 'styled-components'
import avatar3 from '../img/picture3.jpg';
import avatar1 from '../img/default-avatar.jpg';
import avatar2 from '../img/picture2.png';
import { API_URL } from '../utils/urls';

const AvatarPictures = styled.img`
  width: 50px;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const AvatarContainer = styled.label`
  display: flex;
  width: 65px;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'lightblue' : 'transparent')};
  border: 2px solid ${(props) => (props.selected ? 'blue' : 'transparent')};
  padding: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.09);
  }
`;

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// PERSONAL PAGE ////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const AvatarPicker = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  const userID = useSelector((store) => store.user.userId);

  const dispatch = useDispatch();

  const onSelectAvatarSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        userId: userID,
        avatar: selectedAvatar
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    };
    console.log(userID);
    console.log(selectedAvatar);

    fetch(API_URL(`users/${userID}/avatar`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        if (data.success) {
          console.log(data.response.avatar);
          dispatch(user.actions.setAvatar(data.response.avatar));
          dispatch(user.actions.setError(null));
        } else {
          console.log(data.response);
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <form onSubmit={onSelectAvatarSubmit}>
      <AvatarContainer selected={selectedAvatar === 1}>
        <HiddenRadio
          type="radio"
          value={1}
          checked={selectedAvatar === 1}
          onChange={(event) => setSelectedAvatar(Number(event.target.value))} />
        <AvatarPictures alt="avatar" src={avatar1} />
      </AvatarContainer>
      <AvatarContainer selected={selectedAvatar === 2}>
        <HiddenRadio
          type="radio"
          value={2}
          checked={selectedAvatar === 2}
          onChange={(event) => setSelectedAvatar(Number(event.target.value))} />
        <AvatarPictures alt="avatar" src={avatar2} />
      </AvatarContainer>
      <AvatarContainer selected={selectedAvatar === 3}>
        <HiddenRadio
          type="radio"
          value={3}
          checked={selectedAvatar === 3}
          onChange={(event) => setSelectedAvatar(Number(event.target.value))} />
        <AvatarPictures alt="avatar" src={avatar3} />
      </AvatarContainer>
      <button type="submit">Submit</button>
    </form>
  )
}
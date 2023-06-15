/* eslint-disable jsx-a11y/label-has-associated-control */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from 'reducers/user';
import avatar3 from '../img/picture3.png';
import avatar1 from '../img/default-avatar.png';
import avatar2 from '../img/picture2.png';
import { API_URL } from '../utils/urls';
import {
  AvatarPictures,
  HiddenRadio,
  AvatarContainer,
  ContainerAllAvatars,
  Form,
  AvatarPickerInnerWrapper,
  AvatarPickerOuterWrapper,
  AcordionColapsed,
  AddButton
} from './AvatarPickerStyles';
import { CategoryButton } from './PostTodosStyles';

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// PERSONAL PAGE ////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const AvatarPicker = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  const userID = useSelector((store) => store.user.userId);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

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
    <AvatarPickerOuterWrapper>
      <AvatarPickerInnerWrapper>
        <AcordionColapsed>
          <p>CHANGE YOUR AVATAR</p>
          <AddButton type="button" onClick={toggleAccordion}>
            {accordionOpen ? '-' : '+'}
          </AddButton>
        </AcordionColapsed>
        {accordionOpen && (
          <Form onSubmit={onSelectAvatarSubmit}>
            <ContainerAllAvatars>
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
            </ContainerAllAvatars>
            <CategoryButton type="submit">Submit</CategoryButton>
          </Form>
        )}
      </AvatarPickerInnerWrapper>
    </AvatarPickerOuterWrapper>
  );
};

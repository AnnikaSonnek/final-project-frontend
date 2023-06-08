/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from 'reducers/user';
import avatar3 from '../img/picture3.jpg';
import avatar1 from '../img/picture1.jpg';
import avatar2 from '../img/picture2.png';
import { API_URL } from '../utils/urls';

export const PersonalPage = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();

  const onSelectAvatarSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ avatar: selectedAvatar })
    };

    fetch(API_URL('users/:id/avatar'), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.response);
        if (data.success) {
          console.log(data.response.avatar);
          dispatch(user.actions.setSelectedAvatar(data.response.avatar));
          dispatch(user.actions.setError(null));
        } else {
          console.log(data.response);
          dispatch(user.actions.setError(data.response));
        }
      });
  };
  return (
    <><p>Hej hej PERSONAL PAGE!</p>
      <form onSubmit={onSelectAvatarSubmit}>
        <label>
          <input
            type="radio"
            value="avatar1"
            checked={selectedAvatar === 'avatar1'}
            onChange={(event) => setSelectedAvatar(event.target.value)} />
          <img alt="avatar" src={avatar1} />
        </label>
        <label>
          <input
            type="radio"
            value="avatar2"
            checked={selectedAvatar === 'avatar2'}
            onChange={(event) => setSelectedAvatar(event.target.value)} />
          <img alt="avatar" src={avatar2} />
        </label>
        <label>
          <input
            type="radio"
            value="avatar3"
            checked={selectedAvatar === 'avatar3'}
            onChange={(event) => setSelectedAvatar(event.target.value)} />
          <img alt="avatar" src={avatar3} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>

  )
}
/* eslint-disable jsx-a11y/label-has-associated-control */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bild from '../img/default-avatar.jpg';
import bild2 from '../img/picture2.png';
import bild3 from '../img/picture3.jpg';
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';
import './NavBar.css';

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// NAVBAR //////////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const Navbar = () => {
  const loggedInUser = useSelector((store) => store.user.username);
  const avatar = useSelector((store) => store.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(todos.actions.setItems([]));
  };

  const onPersonalPageButtonClick = () => {
    navigate('/Personalpage');
  };

  const onTotoPageButtonClick = () => {
    navigate('/Todopage');
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <section className="top-nav">
      <div className="logo-picture">
        {avatar === 1 ? (
          <img alt="avatar" src={bild} />
        ) : null}
        {avatar === 2 ? (
          <img alt="avatar" src={bild2} />
        ) : null}
        {avatar === 3 ? (
          <img alt="avatar" src={bild3} />
        ) : null}
      </div>
      <p>Hello {loggedInUser}!</p>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button" />
      </label>
      <ul className="menu">
        <li>
          <button type="button" className="Btn" onClick={onLogoutButtonClick}>
        Logout
          </button>
        </li>
        <li>
          <button type="button" className="Btn" onClick={onPersonalPageButtonClick}>
        Personal Page
          </button>
        </li>
        <li>
          <button type="button" className="Btn" onClick={onTotoPageButtonClick}>
        Todopage
          </button>
        </li>
      </ul>
    </section>
  );
};

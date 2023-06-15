/* eslint-disable jsx-a11y/label-has-associated-control */

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import bild from '../img/default-avatar.png';
import bild2 from '../img/picture2.png';
import bild3 from '../img/picture3.png';
import { user } from '../reducers/user';
import { todos } from '../reducers/todos';
import './NavBar.css';

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// NAVBAR //////////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const Navbar = () => {
  const avatar = useSelector((store) => store.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(todos.actions.setItems([]));
    navigate('/');
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <section className="top-nav">
      <div className="logo-picture">
        {avatar === 1 ? <img alt="avatar" src={bild} /> : null}
        {avatar === 2 ? <img alt="avatar" src={bild2} /> : null}
        {avatar === 3 ? <img alt="avatar" src={bild3} /> : null}
      </div>
      <div>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button" />
        </label>
        <ul className="menu">
          <li>
            <NavLink to="/personalpage" activeClassName="active" className="Btn">
              Personal page
            </NavLink>
          </li>
          <li>
            <NavLink to="/todopage" activeClassName="active" className="Btn">
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="Btn" onClick={onLogoutButtonClick}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

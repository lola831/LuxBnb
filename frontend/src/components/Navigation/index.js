import React, { /*useEffect, useState */} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./mybnb.png";

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (

    <ul className='navcontainer'>
      <div className='airbnb'>
      <li>
        <NavLink exact to="/">
          <img
          src={logo}
          alt="logo image"
          height="150px" width="150px"
          />
        </NavLink>
      </li>
      </div>
      {isLoaded && (
        <>
          {sessionUser && (
            <div className='createspot'>
            <li>
              <NavLink exact to="/spots/new">Create a New Spot</NavLink>
            </li>
            </div>
          )}
          <div className='user-logo'>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
          </div>
        </>
      )}
    </ul>

  );
}

export default Navigation;

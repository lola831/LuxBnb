import React, { /*useEffect, useState */} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">airbnb</NavLink>
      </li>
      {isLoaded && (
        <>
          {sessionUser && (
            <li>
              <NavLink exact to="/spots/new">Create a New Spot</NavLink>
            </li>
          )}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Navigation;

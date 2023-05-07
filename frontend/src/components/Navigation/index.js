import React, { /*useEffect, useState */} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
    <ul>
      <div className='airbnb'>
      <li>
        <NavLink exact to="/">airbnb</NavLink>
      </li>
      </div>
      {isLoaded && (
        <>
          {sessionUser && (
            <div className='create-spot'>
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
    </div>
  );
}

export default Navigation;

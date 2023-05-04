import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionUser) setLoggedIn(true);
  }, [sessionUser]);

  return (
    <ul>
      <li>
        <NavLink exact to="/">airbnb</NavLink>
      </li>
      {isLoaded && (
        <>
          {sessionUser && (
            <lil>
              <NavLink exact to="/spots">Create a New Spot</NavLink>
            </lil>
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

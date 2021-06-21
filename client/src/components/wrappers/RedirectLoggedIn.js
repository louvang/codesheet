import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthStatus, fetchUser } from '../../redux/authSlice';

/**
 * redirectLoggedIn() checks to see if a user is logged in:
 * If user is logged in, redirect them to user dashboard.
 * If user is not logged in, the page will render the passed-in component.
 *
 * @param {string} Component The name of the component that checks for authentication
 * @return {function} RedirectLoggedIn component wrapped around the passed-in Component
 */
export default function redirectLoggedIn(Component) {
  return function RedirectLoggedIn() {
    const authStatus = useSelector(selectAuthStatus);
    const dispatch = useDispatch();

    useEffect(() => {
      if (authStatus === 'idle') {
        dispatch(fetchUser());
      }
    }, [authStatus, dispatch]);

    switch (authStatus) {
      case 'succeeded':
        return <Redirect to="/sheet" />;
      case 'failed':
        return <Component />;
      default:
        return null;
    }
  };
}

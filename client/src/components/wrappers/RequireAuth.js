import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, selectAuthStatus, fetchUser } from '../../redux/authSlice';

/**
 * requireAuth() checks to see if a user is logged in:
 * If user is logged in, the passed-in component will load.
 * If user is not logged in, the page will redirect to the login page.
 *
 * @param {string} Component The name of the component that requires authentication
 * @return {function} RequireAuth component wrapped around the passed-in Component
 */
export default function requireAuth(Component) {
  return function RequireAuth() {
    const userData = useSelector(selectUserData);
    const authStatus = useSelector(selectAuthStatus);
    const dispatch = useDispatch();

    useEffect(() => {
      if (authStatus === 'idle') {
        dispatch(fetchUser());
      }
    }, [authStatus, dispatch]);

    switch (authStatus) {
      case 'succeeded':
        return (
          <div>
            <Component userData={userData} />
          </div>
        );
      case 'failed':
        return <Redirect to="/login" />;
      default:
        return null;
    }
  };
}

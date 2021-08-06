import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, selectAuthStatus, fetchUser } from '../../redux/authSlice';

/**
 * semiAuth() checks to see if a user is logged in:
 * If user is logged in, will pass in user data.
 * If user is not logged in, the page will still load but without user data.
 * This is best used for pages that are viewable to the public but only editable by the author (which requires login).
 *
 * @param {string} Component The name of the component that requires authentication
 * @return {function} SemiAuth component wrapped around the passed-in Component
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
        return <Component />;
      default:
        return null;
    }
  };
}

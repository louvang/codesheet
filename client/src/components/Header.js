import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, selectAuthStatus, fetchUser } from '../redux/authSlice';
import axios from 'axios';
import styles from './Header.module.scss';
import Logo from '../assets/logo-32x32.png';

export default function Header() {
  const userData = useSelector(selectUserData);
  const authStatus = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [authStatus, dispatch]);

  const logout = () => {
    axios({
      method: 'GET',
      widthCredentials: true,
      url: '/api/logout',
    }).then((res) => {
      window.location = '/login';
    });
  };

  let authContent;
  switch (authStatus) {
    case 'succeeded':
      authContent = (
        <div>
          Logged in as <strong>{userData.name}</strong>. <button onClick={logout}>Logout</button>
        </div>
      );
      break;
    case 'failed':
      authContent = (
        <div>
          <a href="/login">
            <button className="main marginRight1rem">Login</button>
          </a>
          <a href="/register">
            <button className="main">Register</button>
          </a>
        </div>
      );
      break;
    default:
      authContent = null;
  }

  return (
    <header>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Codesheet Logo" className={styles.logoImg} />
        Codesheet
      </div>
      {authContent}
    </header>
  );
}

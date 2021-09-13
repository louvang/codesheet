import React, { useState } from 'react';
import axios from 'axios';
import styles from './Landing.module.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginErrMsg, setShowLoginErrMsg] = useState(false);

  const checkEnter = (e) => {
    if (e.key === 'Enter') login();
  };

  const login = () => {
    const data = { email, password };

    axios
      .post('/api/login', data)
      .then((res) => {
        window.location = '/';
      })
      .catch((err) => {
        setShowLoginErrMsg(true);
      });
  };

  return (
    <div className={styles.landingContainer}>
      <div className={styles.authLanding}>
        <h1>Log in</h1>

        {showLoginErrMsg ? <div className={`red ${styles.loginError}`}>Wrong username or password.</div> : null}

        <div className={styles.inputContainer}>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            aria-label="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" onClick={login}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

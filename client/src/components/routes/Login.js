import React, { useState } from 'react';
import axios from 'axios';

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
        window.location = '/sheet';
      })
      .catch((err) => {
        setShowLoginErrMsg(true);
      });
  };

  return (
    <div className="landing-container">
      <div className="auth-landing">
        <h1>Log in</h1>

        {showLoginErrMsg ? <div className="red login-error">Wrong username or password.</div> : null}

        <div className="input-container">
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
        <div className="input-container">
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
        <div className="button-container">
          <button type="submit" onClick={login}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

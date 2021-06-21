import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showNameRequiredMsg, setShowNameRequiredMsg] = useState(false);
  const [showInvalidEmailMsg, setShowInvalidEmailMsg] = useState(false);
  const [showInvalidPasswordMsg, setShowInvalidPasswordMsg] = useState(false);
  const [showPasswordMatchMsg, setShowPasswordMatchMsg] = useState(false);
  const [showEmailAlreadyRegisteredMsg, setShowEmailAlreadyRegisteredMsg] = useState(false);

  const checkEnter = (e) => {
    if (e.key === 'Enter') submitRegistration();
  };

  const validateRegistration = () => {
    let isValid;

    // Check that there is a name
    if (name.length <= 0) {
      setShowNameRequiredMsg(true);
    } else {
      setShowNameRequiredMsg(false);
    }

    // Check that email is indeed an email
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setShowInvalidEmailMsg(true);
      isValid = false;
    } else {
      setShowInvalidEmailMsg(false);
    }

    // Check that passwords are 8-32 characters, has 1 or more numbers + 1 or more uppercase + 1 or more lowercase
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d`~!@#$%^&*()_\-+={}[\]|\\;:'"<>,./?]{8,32}$/;
    if (!pwRegex.test(password)) {
      setShowInvalidPasswordMsg(true);
      isValid = false;
    } else {
      setShowInvalidPasswordMsg(false);
    }

    // Check that passwords are the same
    if (password !== confirmPw) {
      setShowPasswordMatchMsg(true);
      isValid = false;
    } else {
      setShowPasswordMatchMsg(false);
    }

    return isValid;
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmPwChange = (e) => {
    setConfirmPw(e.target.value);
  };

  const submitRegistration = (e) => {
    const isValid = validateRegistration();
    if (isValid === false) {
      e.preventDefault();
    } else {
      const data = { name, email, password };

      axios
        .post('/api/register', data)
        .then(function (res) {
          if (res.data === 'User already exists.') {
            setShowEmailAlreadyRegisteredMsg(true);
          } else {
            window.location = '/login';
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  return (
    <div className="landing-container">
      <div className="auth-landing">
        <h1>Sign up</h1>
        <div className="label-container">
          <label htmlFor="name">Name*</label>
          {showNameRequiredMsg ? <div className="red">Name required.</div> : null}
        </div>
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className="label-container">
          <label htmlFor="email">Email*</label>
          {showEmailAlreadyRegisteredMsg ? (
            <div className="red">
              An account is already registered with that email. <a href="/login">Login instead</a>.
            </div>
          ) : null}
          {showInvalidEmailMsg ? <div className="red">Invalid email address.</div> : null}
        </div>
        <div className="input-container">
          <input
            type="text"
            name="email"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className="label-container">
          <label htmlFor="password">Password*</label>
          {showInvalidPasswordMsg ? (
            <div className="red">
              <ul>
                <li>Must be at least 8 characters</li>
                <li>Must have at least 1 lowercase letter</li>
                <li>Must have at least 1 uppercase letter</li>
                <li>Must have at least 1 numher</li>
              </ul>
            </div>
          ) : null}
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={passwordChange}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className="label-container">
          <label htmlFor="confirm_password">Confirm Password*</label>
          {showPasswordMatchMsg ? <div className="red">Your password does not match.</div> : null}
        </div>
        <div className="input-container">
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={confirmPwChange}
            onKeyUp={checkEnter}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" onClick={submitRegistration}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

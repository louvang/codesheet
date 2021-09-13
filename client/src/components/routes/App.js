import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserData, selectAuthStatus, fetchUser } from '../../redux/authSlice';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';

export default function App() {
  document.title = 'Codesheets: Note-taking for developers';
  const userData = useSelector(selectUserData);
  const authStatus = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  let content = '';

  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [authStatus, dispatch]);

  switch (authStatus) {
    case 'succeeded':
      content = (
        <div className="container-with-sb">
          <Sidebar userData={userData} />
          {/* <Content data={userData.lastOpened} /> */}
          <Dashboard userData={userData} />
        </div>
      );
      break;
    case 'failed':
      content = (
        <div>
          <Header />
          <div className="content-container">
            <h1>Notes for Developers</h1>

            <p>Preview image of notes.</p>

            <h2>Special features</h2>

            <div className="col-container">
              <div className="col-3">Column 1</div>
              <div className="col-3">Column 2</div>
              <div className="col-3">Column 3</div>
            </div>
          </div>
        </div>
      );
      break;
    default:
      return null;
  }

  return <div>{content}</div>;
}

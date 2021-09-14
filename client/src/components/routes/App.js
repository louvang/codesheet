import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserData, selectAuthStatus, fetchUser } from '../../redux/authSlice';
import Header from '../Header';
import Preview from '../../assets/preview.gif';
import IllustSingle from '../../assets/illust-single.jpg';
import IllustSave from '../../assets/illust-save.jpg';

export default function App() {
  document.title = 'Codesheet: Note-taking for developers';
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
      window.location = `/${userData.id}/view-all-sheets`;
      break;
    case 'failed':
      content = (
        <div>
          <Header />
          <div className="content-container">
            <div className="col-container">
              <div className="col-2 img-col marginRight1rem">
                <img src={IllustSingle} alt="One Developers Engaging in Code" />
                <div className="attribute">
                  <a href="https://www.freepik.com/vectors/technology" target="_blank" rel="noreferrer">
                    freepik
                  </a>
                </div>
              </div>
              <div className="col-2 flex vCenter marginLeft1rem">
                <div>
                  <h1>Where Devs Take Note</h1>
                  <p>
                    Have too many languages to juggle? Write your notes in Markdown or HTML and save them to your
                    Codesheet account where you can share with your peers and access them wherever, whenever.
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="img-container">
              <img src={IllustDouble} alt="Two Developers Working on Code" />
            </div> */}

            <div className="prev-container">
              <img src={Preview} alt="Preview of Codesheet" />
            </div>

            <div className="col-container">
              <div className="col-2 margin1rem shrink flex vCenter">
                <div>
                  <h1>Try Codesheet for Free</h1>
                  <p>
                    View Codesheet in action with our demo account or{' '}
                    <Link to="/613fe707debe5629ae81112e/view-all-sheets">view it as a peer</Link>.
                  </p>
                  <p>
                    <strong>Email:</strong> demo@codesheet.com
                    <br />
                    <strong>Password:</strong> Demo1234
                  </p>

                  <Link to="/login">
                    <button className="main">Log In</button>
                  </Link>
                </div>
              </div>

              <div className="col-2 margin1rem">
                <div className="img-container">
                  <img src={IllustSave} alt="Save your notes to Codesheet" />
                  <div className="attribute">
                    <a href="https://www.freepik.com/vectors/computer">freepik</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="col-container">
                <div className="col-4">
                  <button className="faux">Privacy Policy</button> | <button className="faux">Terms of Use</button>
                </div>
                <div className="col-4"></div>
                <div className="col-4"></div>
                <div className="col-4 textRight">&copy; 2021 Lou Vang</div>
              </div>
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

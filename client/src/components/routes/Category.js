import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';

import AddIcon from '../../assets/teeny-add.svg';

export default function Category(props) {
  const { userId, categoryTitle } = useParams();

  const [userData, setUserData] = useState();
  const [authorLoggedIn, setAuthorLoggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    if (props.userData) {
      if (props.userData.id === userId) {
        setAuthorLoggedIn(true);
      }
      setUserData(props.userData);
    }

    axios
      .get(`/api/${userId}/category/title/${categoryTitle}`)
      .then((res) => {
        let data = res.data;
        setSheets(data.sheets);
        setTitle(data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryTitle, userId, props.userData, sheets]);

  const goToAddCategoryPage = () => {
    window.location = '/category/new';
  };

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className="sb-content-container">
        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>
            <Link to="/sheet/all">View {authorLoggedIn ? 'All' : "User's"} Sheets</Link>
          </div>
          <div className="flex">
            {authorLoggedIn ? (
              <div className={styles.settingsBtn} onClick={goToAddCategoryPage}>
                <ReactSVG src={AddIcon} /> Add New Category
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.sheet}>
          <ul className={styles.listSheets}>
            <li className={styles.listCategoryTitle}>
              <h2>{title}</h2>
              <ul>
                <li className={styles.listSheetInfo}>
                  <h3>
                    <Link to="/post1">Post Title</Link>
                  </h3>
                  <p>
                    Mrs. Norris, being not at all inclined to question its sufficiency, began to take the matter in
                    another point.
                  </p>
                </li>
                <li className={styles.listSheetInfo}>
                  <h3>
                    <Link to="/post1">Post Title</Link>
                  </h3>
                  <p>
                    Mrs. Norris, being not at all inclined to question its sufficiency, began to take the matter in
                    another point.
                  </p>
                </li>
                <li className={styles.listSheetInfo}>
                  <h3>
                    <Link to="/post1">Post Title</Link>
                  </h3>
                  <p>
                    Mrs. Norris, being not at all inclined to question its sufficiency, began to take the matter in
                    another point.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

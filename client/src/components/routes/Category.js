import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';

import AddIcon from '../../assets/teeny-add.svg';

export default function Category(props) {
  const [title, setTitle] = useState('');
  const { userId, categoryTitle } = useParams();

  useEffect(() => {
    axios
      .get(`/api/${userId}/category/${categoryTitle}`)
      .then((res) => {
        let data = res.data;
        setTitle(data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryTitle, userId]);

  const goToAddCategoryPage = () => {
    window.location = '/category/add';
  };

  return (
    <div className="container-with-sb">
      <Sidebar />

      <div className="sb-content-container">
        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>
            <Link to="/sheet/all">View All Sheets</Link>
          </div>
          <div className="flex">
            <div className={styles.settingsBtn} onClick={goToAddCategoryPage}>
              <ReactSVG src={AddIcon} /> Add New Category
            </div>
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

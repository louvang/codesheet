import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';

import AddIcon from '../../assets/teeny-add.svg';

export default function AllSheets() {
  const goToAddCategoryPage = () => {
    window.location = '/category/add';
  };

  return (
    <div className="container-with-sb">
      <Sidebar />

      <div className="sb-content-container">
        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>All Categories</div>
          <div className="flex">
            <div className={styles.settingsBtn} onClick={goToAddCategoryPage}>
              <ReactSVG src={AddIcon} /> Add New Category
            </div>
          </div>
        </div>
        <div className={styles.sheet}>
          <ul className={styles.listSheets}>
            <li className={styles.listCategoryTitle}>
              <h2>
                <Link to="/category1">Category</Link>
              </h2>
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
            <li className={styles.listCategoryTitle}>
              <h2>
                <Link to="/category2">Category</Link>
              </h2>
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

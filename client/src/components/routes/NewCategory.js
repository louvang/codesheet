import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import slug from 'slug';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';
import Modal from 'react-modal';
import AllIcons from '../../data/category-icons.json';

import Icon_default from '../../assets/icons/default.svg';

Modal.setAppElement('#root');

export default function NewCategory(props) {
  const [userData, setUserData] = useState();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('default');
  const [allIcons, setAllIcons] = useState();
  const [showErrMsg, setShowErrMsg] = useState(false);

  const handleDivClick = (e) => {
    if (e.target.id) {
      let currSelected = document.getElementsByClassName(`${styles.selectedIcon}`);
      let collection = [...currSelected];
      let toUnselect = document.getElementById(collection[0].id);
      toUnselect.classList.remove(`${styles.selectedIcon}`);

      document.getElementById(e.target.id).classList.add(`${styles.selectedIcon}`);
      setIcon(e.target.id);
    }
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const saveCategory = () => {
    if (title === '') {
      setShowErrMsg(true);
    } else {
      let userId = props.userData.id;
      let titleSlug = slug(title);
      const data = { title, icon, userId, titleSlug };

      axios
        .post('/api/add_category', data)
        .then((res) => {
          // TODO: Go to category page
          // http://localhost:3000/60c7775bb3e8821ac86b4731/category/important-notes
          // console.log(res);
          window.location = `/${userId}/category/${titleSlug}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const errMsg = (
    <div className="flex">
      <div className={styles.space}></div>
      <div>
        <span className="red">Please give your category a title.</span>
      </div>
    </div>
  );

  // Load icons during initial render
  useEffect(() => {
    let myIcons = [
      <div
        className={`${styles.iconContainer} ${styles.selectedIcon}`}
        id="default"
        key="default"
        onClick={handleDivClick}
      >
        <ReactSVG src={Icon_default} />
        <div className={styles.iconName}>default</div>
      </div>,
    ];

    let icons = AllIcons.icons;
    icons.forEach((icon) => {
      let svg = require(`../../assets/icons/${icon.fileName}`);
      let IconPath = svg.default;

      let div = (
        <div className={`${styles.iconContainer}`} id={icon.name} key={icon.name} onClick={handleDivClick}>
          <ReactSVG src={IconPath} />
          <div className={styles.iconName}>{icon.name}</div>
        </div>
      );

      myIcons.push(div);
    });

    setAllIcons(myIcons);
  }, []);

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData);
    }
  }, [props]);

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className="sb-content-container">
        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>Add New Category</div>
        </div>
        <div className={styles.sheet}>
          <div className={styles.flexvCenter}>
            <label htmlFor="categoryTitle">Title:</label>
            <input type="text" name="title" placeholder="Title" value={title} onChange={handleTitleInput} />
          </div>
          <div className={styles.flexvTop}>
            <div>
              <label htmlFor="catIcon">Icon:</label>
            </div>
            <div className={styles.allIcons} id="iconContainer">
              {allIcons}
            </div>
          </div>
          {showErrMsg ? errMsg : ''}
          <div className={`${styles.newSaveBtn} ${styles.flexvCenter}`}>
            <div className={styles.space}></div>
            <button onClick={saveCategory}>Add Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}

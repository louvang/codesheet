import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slug from 'slug';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';
import tabOverride from 'taboverride';

import DownIcon from '../../assets/teeny-down-caret.svg';

export default function NewSheet(props) {
  const { userId, sheetTitle } = useParams();

  const [userData, setUserData] = useState();
  const [content, setContent] = useState(`# Heading 1`);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Select');
  const [allCategories, setAllCategories] = useState('');

  useEffect(() => {
    let textarea = document.getElementById('editSheet');
    tabOverride.set(textarea);
    tabOverride.tabSize(2);
  });

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData);
    }

    axios
      .get(`/api/categories_from/${props.userData.id}`)
      .then((res) => {
        let data = res.data;
        let catArr = [];
        data.forEach((category) => {
          catArr.push({ catTitle: category.title, catId: category._id });
        });
        setAllCategories(catArr);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/${userId}/sheet/${sheetTitle}`)
      .then((sheetRes) => {
        let sheetData = sheetRes.data;
        setCategory(sheetData.category);
        setTitle(sheetData.title);
        setContent(sheetData.content);

        axios.get(`/api/sheet_tags/${sheetData._id}`).then((tagRes) => {
          let tagData = tagRes.data;
          let tagArr = tagData.map((tag) => `#${tag.tagTitle}`);
          setTags(tagArr.join(', '));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData, props.userData.id, sheetTitle, userId]);

  const handleSaveClick = () => {
    let userId = props.userData.id;
    let titleSlug = slug(title);
    const data = { category, tags, title, content, userId, titleSlug };

    axios
      .post(`/api/${userId}/edit_sheet/${sheetTitle}/`, data)
      .then((res) => {
        // TODO: Go to created sheet page
        window.location = `/${userId}/sheet/${titleSlug}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategorySelectChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagInputChange = (e) => {
    setTags(e.target.value);
  };

  const categoriesSelection = (
    <select name="category" value={category} onChange={handleCategorySelectChange}>
      <option value="Select">Select</option>
      {[...allCategories].map((category) => {
        return (
          <option value={category.catId} key={category.catTitle}>
            {category.catTitle}
          </option>
        );
      })}
    </select>
  );

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className="sb-content-container2">
        <div className={`${styles.sheetSettings} ${styles.newSheetSettings}`}>
          <div className={styles.catTitle}>
            <div className={styles.selectWrapper}>
              {categoriesSelection}
              <ReactSVG src={DownIcon} />
            </div>
          </div>
        </div>

        <div className={styles.newSheetRow}>
          <input name="title" type="text" placeholder="Sheet Title" value={title} onChange={handleTitleInputChange} />
        </div>
        <div className={styles.newSheet}>
          <textarea name="content" id="editSheet" value={content} onChange={handleTextAreaChange} />
        </div>
        <div className={styles.newSheetRow}>
          <input name="tags" type="text" placeholder="#tag1 #tag2" value={tags} onChange={handleTagInputChange} />
        </div>
        <div className={styles.newSaveBtn}>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

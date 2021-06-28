import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';

import DownIcon from '../../assets/teeny-down-caret.svg';

export default function NewSheet() {
  const [newMarkdown, setNewMarkdown] = useState(`# Heading 1`);

  const handleSaveClick = () => {
    console.log('todo: save to database');
    // save changes to database
    // redirect to newly saved sheet
  };

  const handleTextAreaChange = (e) => {
    setNewMarkdown(e.target.value);
  };

  return (
    <div className="container-with-sb">
      <Sidebar />

      <div className="sb-content-container2">
        <div className={`${styles.sheetSettings} ${styles.newSheetSettings}`}>
          <div className={styles.catTitle}>
            <div className={styles.selectWrapper}>
              <select name="category">
                <option value="title0">Category Title 0</option>
                <option value="title1">Category Title 1</option>
                <option value="title2">Category Title 2</option>
                <option value="title3">Category Title 3 a5sd4ads</option>
                <option value="title3">Add New Category</option>
              </select>
              <ReactSVG src={DownIcon} />
            </div>
          </div>
        </div>
        <div className={styles.addTags}>
          <input name="tags" type="text" placeholder="#tag1 #tag2" />
        </div>
        <div className={styles.newSheet}>
          <textarea value={newMarkdown} onChange={handleTextAreaChange} />
        </div>
        <div className={styles.newSaveBtn}>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './routes/Content.module.scss';

export default function Content(props) {
  return (
    <div className={styles.contentContainer}>
      <h1>{props.userData.name}'s Dashboard</h1>

      <button>Create New Sheet</button>
      <button>Create New Category</button>

      <h2>Recently Updated Sheets</h2>

      <code>console.log('Hello world!');</code>

      <p>This code is located in Dashboard.js</p>
    </div>
  );
}

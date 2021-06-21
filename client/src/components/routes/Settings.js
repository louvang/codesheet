import React from 'react';
import Sidebar from '../Sidebar';

export default function Settings(props) {
  return (
    <div className="with-sidebar">
      <Sidebar />
      <div className="content-container">
        <h1>{props.userData.name}'s Settings</h1>
      </div>
    </div>
  );
}

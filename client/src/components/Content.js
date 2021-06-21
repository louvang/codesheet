import React from 'react';

export default function Content(props) {
  return (
    <div className="content-container">
      <h1>{props.userData.name}'s Dashboard</h1>

      <code>console.log('Hello world!');</code>
    </div>
  );
}

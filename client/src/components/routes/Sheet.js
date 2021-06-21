import React from 'react';
import { ReactSVG } from 'react-svg';
import Sidebar from '../Sidebar';

import EditIcon from '../../assets/teeny-edit.svg';
import EditFillIcon from '../../assets/teeny-edit-fill.svg';
import DeleteIcon from '../../assets/teeny-delete.svg';

export default function Sheet(props) {
  return (
    <div className="container-with-sb">
      <Sidebar userData={props.userData} />

      <div className="sheet-container">
        <div className="sheet-settings">
          <div className="cat-title">
            <a href="/category">Category Title</a> <ReactSVG src={EditIcon} />
          </div>
          <div className="flex">
            <div className="settings-btn flex valign-center">
              <ReactSVG src={EditFillIcon} /> Edit
            </div>
            <div className="settings-btn flex valign-center">
              <ReactSVG src={DeleteIcon} /> Delete
            </div>
            {/* <a href="/edit">Edit</a>
            <ReactSVG src={EditIcon} />
            <a href="/delete">Delete</a>
            <ReactSVG src={DeleteIcon} /> */}
          </div>
        </div>
        <div className="sheet">
          <h1>Heroku</h1>
          <h2>Setting up Heroku CLI</h2>
          <p>Navigate to directory and execute the following code in your Terminal:</p>
          <code>git init</code> initialize git for Heroku
          <br />
          <code>git add .</code> add all folders to git
          <br />
          <code>git commit-m "initial commit"</code> initial commit
          <h3>Heading 3</h3>
          <p>
            But—that he should talk of encouragement, should consider her as aware of his views, accepting his
            attentions, meaning (in short), to marry him!—should suppose himself her equal in connexion or mind!—look
            down upon her friend, so well understanding the gradations of rank below him, and be so blind to what rose
            above, as to fancy himself shewing no presumption in addressing her!—It was most provoking.
          </p>
          <pre>
            {`class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  
  render() {
      return (
          <button onClick={this.handleClick}>
              {this.state.isToggleOn ? ‘ON’ : ‘OFF’}
          </button>
      );
  }
}`}
          </pre>
          <h4>Heading 4</h4>
          <p>
            Fanny listened collectedly, even to the last-mentioned circumstance; nay, it seemed a relief to her worn
            mind to be at any certainty; and the words, “then by this time it is all settled,” passed internally,
            without more evidence of emotion than a faint blush.
          </p>
          <h5>Heading 5</h5>
          <p>
            But—that he should talk of encouragement, should consider her as aware of his views, accepting his
            attentions, meaning (in short), to marry him!—should suppose himself her equal in connexion or mind!—look
            down upon her friend, so well understanding the gradations of rank below him, and be so blind to what rose
            above, as to fancy himself shewing no presumption in addressing her!—It was most provoking.
          </p>
          <h6>Heading 6</h6>
          <p>
            Fanny listened collectedly, even to the last-mentioned circumstance; nay, it seemed a relief to her worn
            mind to be at any certainty; and the words, “then by this time it is all settled,” passed internally,
            without more evidence of emotion than a faint blush.
          </p>
        </div>
      </div>
    </div>
  );
}

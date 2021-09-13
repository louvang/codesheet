import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useParams } from 'react-router-dom';
import styles from './Content.module.scss';
import Sidebar from '../Sidebar';
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import '../../a11y-dark.scss';
import Modal from 'react-modal';

import EditFillIcon from '../../assets/teeny-edit-fill.svg';
import DeleteIcon from '../../assets/teeny-delete.svg';
import axios from 'axios';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '30%',
    left: '58%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '1.25rem',
  },
};

export default function Sheet(props) {
  const { userId, sheetTitle } = useParams();

  const [userData, setUserData] = useState();
  const [authorLoggedIn, setAuthorLoggedIn] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [catTitle, setCatTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [sheetId, setSheetId] = useState();

  useEffect(() => {
    if (props.userData) {
      if (props.userData.id === userId) {
        setAuthorLoggedIn(true);
      }
      setUserData(props.userData);
    }

    axios
      .get(`/api/${userId}/sheet/${sheetTitle}`)
      .then((sheetRes) => {
        let sheetData = sheetRes.data;

        axios
          .get(`/api/${userId}/category/id/${sheetData.category}`)
          .then((catRes) => {
            let catData = catRes.data;
            setCatTitle(catData.title);
            setCatSlug(catData.slug);
          })
          .catch((err) => {
            console.log(err);
          });

        setSheetId(sheetData._id);
        setMarkdown(sheetData.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sheetTitle, userId, props.userData, setAuthorLoggedIn]);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const deleteSheet = () => {
    axios
      .get(`/api/delete_sheet/${sheetId}`)
      .then((res) => {
        window.location = `/sheets`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHTML = () => {
    marked.setOptions({
      langPrefix: 'hljs language-',
      highlight: function (code) {
        return hljs.highlightAuto(code, [
          'bash',
          'c',
          'csharp',
          'css',
          'html',
          'java',
          'javascript',
          'json',
          'markdown',
          'perl',
          'php',
          'python',
          'r',
          'ruby',
          'rust',
          'scss',
          'sql',
          'swift',
          'txt',
          'typescript',
          'vbnet',
          'yaml',
        ]).value;
      },
    });

    let rawMarkup = marked(markdown);
    let cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };

  const handleEditClick = () => {
    window.location = `/${userId}/edit-sheet/${sheetTitle}`;
  };

  let btns = (
    <div className="flex">
      <div className={styles.settingsBtn} onClick={handleEditClick}>
        <ReactSVG src={EditFillIcon} /> Edit
      </div>
      <div className={styles.settingsBtn} onClick={openModal}>
        <ReactSVG src={DeleteIcon} /> Delete
      </div>
      <Modal isOpen={modalOpened} onRequestClose={closeModal} style={customStyles} contentLabel="Delete Modal">
        <div>Are you sure you want to delete this sheet?</div>
        <div className={styles.confirmBtns}>
          <button className={styles.yes} onClick={deleteSheet}>
            Yes
          </button>
          <button className={styles.no} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );

  let sheetContent = <div className={styles.sheet} dangerouslySetInnerHTML={getHTML()} />;

  let categoryTitle = (
    <div className={styles.catTitle}>
      <Link to={`/${userId}/category/${catSlug}`}>{catTitle}</Link>
    </div>
  );

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className={styles.contentContainer}>
        <div className={styles.sheetSettings}>
          {categoryTitle}
          {authorLoggedIn ? btns : null}
        </div>
        {sheetContent}
      </div>
    </div>
  );
}

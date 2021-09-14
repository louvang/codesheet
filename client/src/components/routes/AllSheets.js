import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';
import Modal from 'react-modal';

import AddIcon from '../../assets/teeny-add.svg';

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

export default function AllSheets(props) {
  const { userId } = useParams();

  const [userData, setUserData] = useState();
  const [authorLoggedIn, setAuthorLoggedIn] = useState(false);
  const [sheets, setSheets] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [sheetToDelete, setSheetToDelete] = useState('');
  const [sheetAuthorId, setSheetAuthorId] = useState('');
  const [pageTitle, setPageTitle] = useState('All Sheets');

  useEffect(() => {
    if (props.userData) {
      console.log(props.userData);
      if (props.userData.id === userId) {
        setAuthorLoggedIn(true);
      }
      setUserData(props.userData);
    }

    axios
      .get(`/api/${userId}/sheets_by_author`)
      .then((res) => {
        let data = res.data;
        setSheetAuthorId(data[0].createdBy);
        setSheets(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/user/${sheetAuthorId}`)
      .then((userRes) => {
        let sheetAuthorData = userRes.data;
        setPageTitle(`${sheetAuthorData.name}'s Sheets`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData, sheetAuthorId, userId]);

  const goToAddCategoryPage = () => {
    window.location = '/category/new';
  };

  const openModal = (e) => {
    setSheetToDelete(e.target.id);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const deleteSheet = () => {
    axios
      .get(`/api/delete_sheet/${sheetToDelete}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className="sb-content-container">
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

        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>{pageTitle}</div>
          <div className="flex">
            {authorLoggedIn ? (
              <div className={styles.settingsBtn} onClick={goToAddCategoryPage}>
                <ReactSVG src={AddIcon} /> Add New Category
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.sheet}>
          <ul className={styles.listSheets}>
            <li className={styles.listCategoryTitle}>
              <div className={styles.listHeading}>
                <h2>{pageTitle}</h2>
                {authorLoggedIn ? (
                  <Link to="/sheet/new">
                    <button className="main">Add New Sheet</button>
                  </Link>
                ) : null}
              </div>
              <ul>
                {[...sheets].map((sheet) => {
                  return (
                    <li className={styles.listSheetInfo} key={sheet._id}>
                      <div className="flex vCenter spaceBtwn liContainer">
                        <h3>
                          <Link to={`/${sheet.createdBy}/sheet/${sheet.slug}`}>{sheet.title}</Link>
                        </h3>
                        <div>
                          {authorLoggedIn ? (
                            <div>
                              <Link to={`/${sheet.createdBy}/edit-sheet/${sheet.slug}`}>
                                <button className="secondary margin1rem marginLeft0rem">Edit Sheet</button>
                              </Link>

                              <button className="margin1rem marginLeft0rem" id={sheet._id} onClick={openModal}>
                                Delete Sheet
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar';
import styles from './Content.module.scss';

export default function Category(props) {
  const { searchTerm } = useParams();

  const [userData, setUserData] = useState();
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    console.log(props.userData);
    if (props.userData) {
      setUserData(props.userData);
    }

    axios
      .get(`/api/search/${searchTerm}`)
      .then((res) => {
        let data = res.data;
        setSheets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData, searchTerm]);

  return (
    <div className="container-with-sb">
      <Sidebar userData={userData} />

      <div className="sb-content-container">
        <div className={`${styles.sheetSettings}`}>
          <div className={styles.catTitle}>
            <Link to="/">Index</Link>
          </div>
        </div>
        <div className={styles.sheet}>
          <ul className={styles.listSheets}>
            <li className={styles.listCategoryTitle}>
              <div className={styles.listHeading}>
                <h2>Search results for "{searchTerm}"</h2>
              </div>
              {sheets.length === 0 ? (
                <div className="margin1rem">There are no sheets matching the term "{searchTerm}"</div>
              ) : null}
              <ul>
                {[...sheets].map((sheet) => {
                  return (
                    <li className={styles.listSheetInfo} key={sheet._id}>
                      <div className="flex vCenter spaceBtwn liContainer">
                        <h3>
                          <Link to={`/${sheet.createdBy}/sheet/${sheet.slug}`}>{sheet.title}</Link>
                        </h3>
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

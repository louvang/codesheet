import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import styles from './Sidebar.module.scss';
import Logo from '../assets/logo-32x32.png';
import SettingsIcon from '../assets/teeny-settings.svg';
import XIcon from '../assets/teeny-x.svg';
import SearchIcon from '../assets/teeny-search.svg';

export default function Sidebar(props) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [sbTitle, setSbTitle] = useState('Codesheets');
  const [sidebarCatList, setSidebarCatList] = useState([]);
  const [sidebarTagList, setSidebarTagList] = useState([]);

  useEffect(() => {
    if (props.userData !== undefined) {
      setUserLoggedIn(true);
      setSbTitle(`${props.userData.name}'s Sheets`);

      axios
        .get(`/api/categories_from/${props.userData.id}`)
        .then((res) => {
          let data = res.data;
          let catArr = [];
          data.forEach((category) => {
            catArr.push({
              catTitle: category.title,
              catId: category._id,
              sheetCt: category.sheets.length,
              icon: category.icon,
              authorId: category.createdBy,
              slug: category.slug,
            });
          });
          setSidebarCatList(catArr);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`/api/tags_from/${props.userData.id}`)
        .then((res) => {
          let data = res.data;
          let tagArr = [];
          data.forEach((tag) => {
            tagArr.push({
              tagTitle: tag.tagTitle,
              tagId: tag._id,
              url: `/${props.userData.id}/tag/${tag._id}`,
            });
          });
          setSidebarTagList(tagArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.userData]);

  const newSheetClick = (e) => {
    e.preventDefault();
    window.location.href = '/sheet/new';
  };

  let catList = '';
  let tagList = '';
  let joinBtn = '';
  if (userLoggedIn) {
    catList = (
      <div className={styles.listSection}>
        <div className={styles.sectionTitle}>
          <div>Categories</div>
          <div className={styles.addCategory} onClick={() => (window.location = '/category/new')}>
            + New
          </div>
        </div>
        {[...sidebarCatList].map((category) => {
          let svg = require(`../assets/icons/${category.icon}.svg`);
          let IconPath = svg.default;

          return (
            <div
              className={styles.listRow}
              key={category.catId}
              onClick={() => (window.location = `/${category.authorId}/category/${category.slug}`)}
            >
              <div className={styles.colLeft}>
                <div className={styles.colIcon}>
                  <ReactSVG src={IconPath} />
                </div>
                <div className={styles.colCatTitle}>{category.catTitle}</div>
              </div>
              <div className={styles.colRight}>
                <div className={styles.sheetCt}>{category.sheetCt}</div>
              </div>
            </div>
          );
        })}
      </div>
    );

    tagList = (
      <div className={styles.tagsSection}>
        <div className={styles.sectionTitle}>Tags</div>
        <div className={styles.tagsList}>
          {[...sidebarTagList].map((tag) => {
            return (
              <div className={styles.tag} key={tag.tagId}>
                <Link to={tag.url}>#{tag.tagTitle}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    joinBtn = (
      <div className="flex vCenter spaceEvenly">
        <Link to="/login">Login</Link>
        <button className="main margin1rem">Sign Up</button>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.userRow}>
        <div className={styles.colLogo}>
          <img src={Logo} alt="Codesheets Logo" />
        </div>
        <div className={styles.colName}>{sbTitle}</div>
        <div className={styles.colMore}>{userLoggedIn ? <img src={SettingsIcon} alt="Settings Icon" /> : null}</div>
      </div>

      <div className={styles.searchRow}>
        <div className={styles.searchBar}>
          <div className={styles.colSearchInput}>
            <input type="text" placeholder="Search..." name="Search" id={styles.searchInput} />
          </div>
          <div className={styles.colSearchIcon}>
            <label htmlFor="Search">
              <ReactSVG src={SearchIcon} />
            </label>
          </div>
          <div className={styles.colSearchDel}>
            <ReactSVG src={XIcon} />
          </div>
        </div>
      </div>

      {catList}
      {tagList}
      {joinBtn}

      {/* <div className={styles.listSection}>
        <div className={styles.sectionTitle}>
          <div>Categories</div>
          <div className={styles.addCategory} onClick={() => (window.location = '/category/new')}>
            + New
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={HTMLIcon} />
            </div>
            <div className={styles.colCatTitle}>HTML</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>1</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={CSSIcon} />
            </div>
            <div className={styles.colCatTitle}>CSS</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>2</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={JsIcon} />
            </div>
            <div className={styles.colCatTitle}>JavaScript</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>13</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={ReactIcon} />
            </div>
            <div className={styles.colCatTitle}>React</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>4</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={NodeIcon} />
            </div>
            <div className={styles.colCatTitle}>Node</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>7</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={HTMLIcon} />
            </div>
            <div className={styles.colCatTitle}>HTML</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>1</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={CSSIcon} />
            </div>
            <div className={styles.colCatTitle}>CSS</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>2</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={JsIcon} />
            </div>
            <div className={styles.colCatTitle}>JavaScript</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>13</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={ReactIcon} />
            </div>
            <div className={styles.colCatTitle}>React</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>4</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={NodeIcon} />
            </div>
            <div className={styles.colCatTitle}>Node</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>7</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={HTMLIcon} />
            </div>
            <div className={styles.colCatTitle}>HTML</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>1</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={CSSIcon} />
            </div>
            <div className={styles.colCatTitle}>CSS</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>2</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={JsIcon} />
            </div>
            <div className={styles.colCatTitle}>JavaScript</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>13</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={ReactIcon} />
            </div>
            <div className={styles.colCatTitle}>React</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>4</div>
          </div>
        </div>

        <div className={styles.listRow}>
          <div className={styles.colLeft}>
            <div className={styles.colIcon}>
              <ReactSVG src={NodeIcon} />
            </div>
            <div className={styles.colCatTitle}>Node</div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.sheetCt}>7</div>
          </div>
        </div>
      </div> */}

      {/* <div className={styles.tagsSection}>
        <div className={styles.sectionTitle}>Tags</div>
        <div className={styles.tagsList}>
          <div className={styles.tag}>#redux</div>
          <div className={styles.tag}>#express</div>
          <div className={styles.tag}>#cheatsheet</div>
          <div className={styles.tag}>#deployment</div>
          <div className={styles.tag}>#animation</div>
          <div className={styles.tag}>#mongoose</div>
          <div className={styles.tag}>#mern</div>
          <div className={styles.tag}>#udemy</div>
          <div className={styles.tag}>#redux</div>
          <div className={styles.tag}>#express</div>
          <div className={styles.tag}>#cheatsheet</div>
          <div className={styles.tag}>#deployment</div>
          <div className={styles.tag}>#animation</div>
          <div className={styles.tag}>#mongoose</div>
          <div className={styles.tag}>#mern</div>
          <div className={styles.tag}>#udemy</div>
          <div className={styles.tag}>#redux</div>
          <div className={styles.tag}>#express</div>
          <div className={styles.tag}>#cheatsheet</div>
          <div className={styles.tag}>#deployment</div>
          <div className={styles.tag}>#animation</div>
          <div className={styles.tag}>#mongoose</div>
          <div className={styles.tag}>#mern</div>
          <div className={styles.tag}>#udemy</div>
          <div className={styles.tag}>#redux</div>
          <div className={styles.tag}>#express</div>
          <div className={styles.tag}>#cheatsheet</div>
          <div className={styles.tag}>#deployment</div>
          <div className={styles.tag}>#animation</div>
          <div className={styles.tag}>#mongoose</div>
          <div className={styles.tag}>#mern</div>
          <div className={styles.tag}>#udemy</div>
        </div>
      </div> */}

      {userLoggedIn ? (
        <div className={styles.newSheetRow}>
          <button className={styles.newSheetBtn} onClick={newSheetClick}>
            + Add new sheet
          </button>
        </div>
      ) : null}
    </div>
  );
}

import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './Sidebar.module.scss';
import Logo from '../assets/logo-32x32.png';
import SettingsIcon from '../assets/teeny-settings.svg';
import XIcon from '../assets/teeny-x.svg';
import SearchIcon from '../assets/teeny-search.svg';

import JsIcon from '../assets/icons/js.svg';
import ReactIcon from '../assets/icons/react.svg';
import NodeIcon from '../assets/icons/nodejs.svg';
import HTMLIcon from '../assets/icons/html.svg';
import CSSIcon from '../assets/icons/css.svg';

export default function Sidebar(props) {
  const newSheetClick = (e) => {
    e.preventDefault();
    window.location.href = '/sheet/new';
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.userRow}>
        <div className={styles.colLogo}>
          <img src={Logo} alt="Codesheets Logo" />
        </div>
        <div className={styles.colName}>Lou's Sheets</div>
        <div className={styles.colMore}>
          <img src={SettingsIcon} alt="Settings Icon" />
        </div>
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

      <div className={styles.listSection}>
        <div className={styles.sectionTitle}>Categories</div>

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
      </div>

      <div className={styles.tagsSection}>
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
      </div>

      <div className={styles.newSheetRow}>
        <button className={styles.newSheetBtn} onClick={newSheetClick}>
          + Add new sheet
        </button>
      </div>
    </div>
  );
}

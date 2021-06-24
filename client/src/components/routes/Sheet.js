import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import styles from './Sheet.module.scss';
import Sidebar from '../Sidebar';
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import '../../a11y-dark.scss';
import tabOverride from 'taboverride';

import EditIcon from '../../assets/teeny-edit.svg';
import EditFillIcon from '../../assets/teeny-edit-fill.svg';
import DeleteIcon from '../../assets/teeny-delete.svg';
import SaveIcon from '../../assets/teeny-save.svg';

export default function Sheet(props) {
  const [editCategory, setEditCategory] = useState(false);
  const [catTitle, setCatTitle] = useState('Category Title Here');
  const [editMode, setEditMode] = useState(false);
  const [markdown, setMarkdown] = useState(`# Heading 1

This example of Markdown text will be using placeholder text from the works of Jane Austen. The text is randomly generated from [Austen Ipsum](https://austenipsum.co).
  
Elizabeth, with a *triumphant* sensation, looked towards his friend. He bore it with noble indifference, and she would have imagined that Bingley had received his sanction to be happy, had she not seen his eyes likewise turned towards Mr. Darcy, with an expression of half-laughing alarm.
  
> She held out her hand; he kissed it with affectionate gallantry, 
> though he hardly knew how to look, and they entered the house.

She was regretted by no one at Mansfield. She had never been able to attach even those she **loved** best; and since Mrs. Rushworth’s elopement, her temper had been in a state of such irritation as to make her everywhere tormenting. Not even Fanny had tears for aunt Norris, not even when she was gone for ever.
  
## Heading 2

Mr. John Dashwood had not the strong feelings of the rest of the family; but he was affected by a recommendation of such a nature at such a time, and he promised to do every thing in his power to make them comfortable. His father was rendered easy by such an assurance, and Mr. John Dashwood had then leisure to consider how much there might prudently be in his power to do for them.

* Mr. Crawford bowed his thanks.
* Elizabeth impatiently caught it from his hand. Jane now came up.
  * Colonel Brandon’s horses were announced.
  * She could settle it in no way that gave her pleasure.
* Darcy shook his head in silent acquiescence.

As the Miss Dashwoods entered the drawing-room of the park the next day, at one door, Mrs. Palmer came running in at the other, looking as good humoured and merry as before. She took them all most affectionately by the hand, and expressed great delight in seeing them again.

1. This was invitation enough.
2. The resolution of doing so helped to form the comfort of their evening.
3. Mrs. Rushworth, who saw nothing but her son, was quite at a loss.

### Heading 3

Mrs. Dashwood smiled, and said nothing. Marianne lifted up her eyes in astonishment, and Elinor conjectured that she might as well have held her tongue.

- [ ] This is an incomplete item
- [x] This is a complete item

Her eldest daughter endeavoured to give some relief to the violence of these transports, by leading her thoughts to the obligations which Mr. Gardiner’s behaviour laid them all under.

#### Heading 4

The following conversation, which took place between the two friends in the pump-room one morning, after an acquaintance of eight or nine days, is given as a specimen of their very warm attachment, and of the delicacy, discretion, originality of thought, and literary taste which marked the reasonableness of that attachment.

Header 1 | Header 2
-------- | --------
Content cell 1 | Content cell 2
Content column 1 | Content column 2

This argument was irresistible. It gave to his intentions whatever of decision was wanting before; and he finally resolved, that it would be absolutely unnecessary, if not highly indecorous, to do more for the widow and children of his father, than such kind of neighbourly acts as his own wife pointed out.

##### Heading 5

Supper was announced. The move began; and Miss Bates might be heard from that moment, without interruption, till her being seated at table and taking up her spoon.

<details>
  <summary>Spoiler warning</summary>
  Anne caught his eye, saw his cheeks glow, and his mouth form itself into a momentary expression of contempt, and turned away, that she might neither see nor hear more to vex her.
</details>

Now, how were his sentiments to be read? Was this like wishing to avoid her? And the next moment she was hating herself for the folly which asked the question.

###### Heading 6

Precisely such had the paragraph originally stood from the printer's hands; but Sir Walter had improved it by adding, for the information of himself and his family, these words, after the date of Mary's birth--"Married, December 16, 1810, Charles, son and heir of Charles Musgrove, Esq. of Uppercross, in the county of Somerset," and by inserting most accurately the day of the month on which he had lost his wife.

${'```'}javascript
function test() {
  console.log("look ma', no spaces");
}
${'```'}

Their intended excursion to Whitwell turned ${'`'}out${'`'} very different from what Elinor had expected. She was prepared to be wet through, fatigued, and frightened; but the event was still more unfortunate, for they did not go at all.`);

  useEffect(() => {
    if (editMode) {
      let textarea = document.getElementById('editSheet');
      tabOverride.set(textarea);
      tabOverride.tabSize(2);
    }
  });

  const handleEditCategoryClick = () => {
    setEditCategory(true);
  };

  const handleSaveCategoryClick = () => {
    setEditCategory(false);
  };

  const handleCatInputChange = (e) => {
    setCatTitle(e.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // save changes to database
  };

  const handleTextAreaChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getMarkdown = () => {
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

  let btns, sheetContent;
  if (editMode) {
    sheetContent = (
      <div className={styles.sheet}>
        <textarea value={markdown} onChange={handleTextAreaChange} id="editSheet"></textarea>
      </div>
    );

    btns = (
      <div className="flex">
        <div className={styles.settingsBtn} onClick={handleSaveClick}>
          <ReactSVG src={SaveIcon} /> Save
        </div>
      </div>
    );
  } else {
    btns = (
      <div className="flex">
        <div className={styles.settingsBtn} onClick={handleEditClick}>
          <ReactSVG src={EditFillIcon} /> Edit
        </div>
        <div className={styles.settingsBtn}>
          <ReactSVG src={DeleteIcon} /> Delete
        </div>
      </div>
    );

    sheetContent = <div className={styles.sheet} dangerouslySetInnerHTML={getMarkdown()} />;
  }

  let categoryTitle;
  if (editCategory) {
    categoryTitle = (
      <div className={styles.catTitle}>
        <input type="text" value={catTitle} onChange={handleCatInputChange} />{' '}
        <ReactSVG src={SaveIcon} onClick={handleSaveCategoryClick} />
      </div>
    );
  } else {
    categoryTitle = (
      <div className={styles.catTitle}>
        <a href="/category">{catTitle}</a> <ReactSVG src={EditIcon} onClick={handleEditCategoryClick} />
      </div>
    );
  }

  return (
    <div className="container-with-sb">
      <Sidebar />

      <div className={styles.sheetContainer}>
        <div className={styles.sheetSettings}>
          {categoryTitle}
          {btns}
        </div>
        {sheetContent}
      </div>
    </div>
  );
}

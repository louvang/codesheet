const Sheet = require('../models/Sheet');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const User = require('../models/User');

/**
 * Helper function - break up tags into an array
 */
const tagsArr = (tagsStr) => {
  if (tagsStr === '') {
    return [];
  }

  let tagsArr = [];
  let hashReg = /#/;
  let commaReg = /,/;

  if (hashReg.test(tagsStr)) {
    tagsArr = tagsStr.split('#').filter((tag) => tag !== '');
  } else if (commaReg.test(tagStr)) {
    tagsArr = tagsStr.split(',');
  } else {
    tagsArr = tagsStr.split(' ');
  }

  let finalTagsArr = tagsArr.map((tag) => {
    return tag.replace(',', '').trim().toLowerCase();
  });

  return finalTagsArr;
};

/**
 * Helper function - save tags to database
 */
const saveTags = (finalTagsArr, bodyUserId, sheetId) => {
  if (finalTagsArr === []) {
    return;
  }

  finalTagsArr.forEach((tag) => {
    Tag.findOne({ tagTitle: tag, tagCreatedBy: bodyUserId }, async (err, tagDoc) => {
      if (err) throw err;
      if (tagDoc) {
        tagDoc.dateTagUpdated = Date.now();

        if (!tagDoc.sheets.includes(sheetId)) {
          tagDoc.sheets.push(sheetId);
        }
        await tagDoc.save();
      }
      if (!tagDoc) {
        const newTag = new Tag({
          tagTitle: tag,
          dateTagCreated: Date.now(),
          dateTagUpdated: Date.now(),
          sheets: [sheetId],
          tagCreatedBy: bodyUserId,
        });

        await newTag.save();
      }
    });
  });
};

/**
 * Helper function - delete sheets from tags
 */
const deleteSheetFromTag = (diffArr, bodyUserId, sheetId) => {
  // Find tags that are no longer a part of the tagsArr and remove sheets
  if (diffArr.length > 0) {
    diffArr.forEach((tagName) => {
      Tag.updateOne(
        { tagTitle: tagName, tagCreatedBy: bodyUserId },
        { $pullAll: { sheets: [sheetId] } },
        { new: true },
        (err) => {
          if (err) throw err;
        }
      );

      Tag.findOne({ tagCreatedBy: bodyUserId, tagTitle: tagName }, async (err, tagDoc) => {
        if (err) throw err;
        if (tagDoc) {
          tagDoc.sheets.pull(sheetId);
          await tagDoc.save();
        }
      });
    });
  }
};

/**
 * Helper function - delete tags from database if there are no sheets to reference
 */
const deleteTags = async (bodyUserId) => {
  await Tag.deleteMany({ tagCreatedBy: bodyUserId, sheets: { $size: 0 } }, (err) => {
    if (err) throw err;
  });
};

/**
 * Helper function - update sheets in categories
 */
const updateCatSheets = (oldCat, newCat, sheetId) => {
  // If category is changed, then we need to delete sheet from old cat
  Category.findOne({ _id: oldCat }, async (err, catDoc) => {
    if (err) throw err;
    if (catDoc) {
      catDoc.sheets.pull(sheetId);
      await catDoc.save();
    }
  });

  // And we need to add the sheet to the new cat
  Category.findOne({ _id: newCat }, async (err, catDoc) => {
    if (err) throw err;
    if (catDoc) {
      catDoc.sheets.push(sheetId);
      await catDoc.save();
    }
  });
};

/**
 * POST - Adds a new sheet to the database
 */
exports.add_sheet = (req, res) => {
  let sheetId;

  // Save sheet
  Sheet.findOne({ slug: req.body.titleSlug, createdBy: req.body.userId }, async (err, sheetDoc) => {
    if (err) throw err;
    if (sheetDoc) {
      res.send('A document with the same name already exists.');
    } else {
      const newSheet = new Sheet({
        title: req.body.title,
        slug: req.body.titleSlug,
        content: req.body.content,
        dateCreated: Date.now(),
        lastUpdated: Date.now(),
        tags: tagsArr(req.body.tags),
        category: req.body.category,
        createdBy: req.body.userId,
      });

      await newSheet.save();
      sheetId = newSheet._id;

      // Save tags
      await saveTags(tagsArr(req.body.tags), req.body.userId, sheetId);

      // Find tags with the sheet ID and add them in sheet

      Category.findOne({ _id: req.body.category }, async (err, catDoc) => {
        if (err) throw err;
        if (catDoc) {
          catDoc.sheets.push(sheetId);
          await catDoc.save();
        }
      });
      res.send('New sheet saved.');
    }
  });
};

/**
 * POST - Updates changes to a sheet
 */
exports.edit_sheet = (req, res) => {
  let userId = req.params.userId;
  let sheetTitle = req.params.sheetTitle;

  Sheet.findOne({ createdBy: userId, slug: sheetTitle }, async (err, sheetDoc) => {
    if (err) throw err;
    if (sheetDoc) {
      let oldTags = sheetDoc.tags;
      let updatedTags = [...tagsArr(req.body.tags)];
      let difference;
      if (oldTags.length > updatedTags.length) {
        difference = oldTags.filter((x) => !updatedTags.includes(x));
      } else {
        difference = updatedTags.filter((x) => !oldTags.includes(x));
      }

      let oldCat = sheetDoc.category;
      let newCat = req.body.category;

      sheetDoc.title = req.body.title;
      sheetDoc.slug = req.body.titleSlug;
      sheetDoc.content = req.body.content;
      sheetDoc.lastUpdated = Date.now();
      sheetDoc.tags = tagsArr(req.body.tags);
      sheetDoc.category = req.body.category;

      await sheetDoc.save();
      saveTags(tagsArr(req.body.tags), req.body.userId, sheetDoc._id);
      deleteSheetFromTag(difference, userId, sheetDoc._id);
      await deleteTags(userId);

      if (oldCat !== newCat) {
        await updateCatSheets(oldCat, newCat, sheetDoc._id);
      }

      res.send('Sheet updated.');
    }
  });
};

/**
 * POST - Adds a new category to the database
 */
exports.add_category = (req, res) => {
  Category.findOne({ title: req.body.title, createdBy: req.body.userId }, async (err, categoryDoc) => {
    if (err) throw err;
    if (categoryDoc) {
      res.send('A category with the same name already exists.');
    }
    if (!categoryDoc) {
      const newCategory = new Category({
        title: req.body.title,
        slug: req.body.titleSlug,
        icon: req.body.icon,
        dateCreated: Date.now(),
        createdBy: req.body.userId,
      });

      await newCategory.save();
      res.send('New category created.');
    }
  });
};

/**
 * GET - Retrieves a sheet (PUBLIC)
 */
exports.get_sheet = (req, res) => {
  let userId = req.params.userId;
  let sheetTitle = req.params.sheetTitle;

  Sheet.findOne({ createdBy: userId, slug: sheetTitle }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      res.send(sheet);
    }
  });
};

/**
 * GET - Retrieves all categories of a specific user (PUBLIC)
 */
exports.get_all_categories_from_user = (req, res) => {
  let userId = req.params.userId;

  Category.find({ createdBy: userId }, async (err, categories) => {
    if (err) throw err;
    if (categories) {
      res.send(categories);
    }
  });
};

/**
 * GET - Retrieves one category and sheets within that category via title
 */
exports.get_category_by_title = (req, res) => {
  let userId = req.params.userId;
  let categoryTitle = req.params.categoryTitle;

  Category.findOne({ createdBy: userId, slug: categoryTitle }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      res.send(sheet);
    }
  });
};

/**
 * GET - Retrieves one category and sheets within that category via ID
 */
exports.get_category_by_id = (req, res) => {
  let userId = req.params.userId;
  let categoryId = req.params.categoryId;

  Category.findOne({ createdBy: userId, _id: categoryId }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      res.send(sheet);
    }
  });
};

/**
 * GET - Retrieves all tags of specified sheet
 */
exports.get_tag_by_sheet = (req, res) => {
  let sheetId = req.params.sheetId;

  Tag.find({ sheets: sheetId }, async (err, tags) => {
    if (err) throw err;
    if (tags) {
      res.send(tags);
    }
  });
};

/**
 * GET - Retrieve all tags of a user
 */
exports.get_all_tags_from_user = (req, res) => {
  let userId = req.params.userId;

  Tag.find({ tagCreatedBy: userId }, async (err, tags) => {
    if (err) throw err;
    if (tags) {
      res.send(tags);
    }
  });
};

/**
 * GET - Get tag info by tag ID
 */
exports.get_tag_by_id = (req, res) => {
  let userId = req.params.userId;
  let tagId = req.params.tagId;

  Tag.findOne({ tagCreatedBy: userId, _id: tagId }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      res.send(sheet);
    }
  });
};

/**
 * POST - Delete a sheet
 */
exports.delete_sheet = (req, res) => {
  const sheetId = req.params.sheetId;
  const userId = req.user._id;

  Sheet.findOne({ _id: sheetId }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      const currUser = JSON.stringify(userId);
      const sheetAuthor = JSON.stringify(sheet.createdBy);

      if (currUser === sheetAuthor) {
        let tags = sheet.tags;
        deleteSheetFromTag(tags, userId, sheetId);
        await deleteTags(userId);

        let categoryId = sheet.category;
        Category.findOne({ _id: categoryId }, async (err, catDoc) => {
          if (err) throw err;
          if (catDoc) {
            catDoc.sheets.pull(sheetId);
            await catDoc.save();
          }
        });

        await sheet.deleteOne();
        res.send('Sheet deleted.');
      } else {
        res.status(401).send({ error: 'You must be the author to delete this sheet.' });
      }
    }
  });
};

/**
 * GET - Get all sheets by category
 */
exports.get_sheets_by_category = (req, res) => {
  let categoryId = req.params.categoryId;
  let userId = req.params.userId;

  Sheet.find({ createdBy: userId, category: categoryId }, async (err, sheets) => {
    if (err) throw err;
    if (sheets) {
      res.send(sheets);
    }
  });
};

/**
 * GET - Get all sheets by author
 */
exports.get_sheets_by_author = (req, res) => {
  let userId = req.params.userId;

  Sheet.find({ createdBy: userId }, async (err, sheets) => {
    if (err) throw err;
    if (sheets) {
      res.send(sheets);
    }
  });
};

/**
 * GET - Get all sheets by tag title
 */
exports.get_sheets_by_tagTitle = (req, res) => {
  let tagTitle = req.params.tagTitle;
  let userId = req.params.userId;

  console.log('Sheets by tag title');
  console.log(tagTitle);

  Sheet.find({ createdBy: userId, tags: tagTitle }, async (err, sheets) => {
    if (err) throw err;
    if (sheets) {
      res.send(sheets);
    }
  });
};

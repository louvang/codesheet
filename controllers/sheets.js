const Sheet = require('../models/Sheet');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const User = require('../models/User');

/**
 * Helper function - break up tags into an array
 */
const tagsArr = (tagsStr) => {
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

      newSheet.save();
      sheetId = newSheet._id;

      // Save tags
      saveTags(tagsArr(req.body.tags), req.body.userId, sheetId);

      // Find category and add sheet's id to array
      Category.findOne({ title: req.body.category, createdBy: req.body.userId }, async (err, categoryDoc) => {
        if (err) throw err;
        if (categoryDoc) {
          categoryDoc.dateUpdated = Date.now();
          categoryDoc.sheets.push(newSheet._id);
          await categoryDoc.save();
          console.log('Category saved.');
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

      console.log(`old tags: ${oldTags}`);
      console.log(`updated tags: ${updatedTags}`);
      console.log(`difference: ${difference}`);

      sheetDoc.title = req.body.title;
      sheetDoc.slug = req.body.titleSlug;
      sheetDoc.content = req.body.content;
      sheetDoc.lastUpdated = Date.now();
      sheetDoc.tags = tagsArr(req.body.tags);
      sheetDoc.category = req.body.category;

      sheetDoc.save();
      saveTags(tagsArr(req.body.tags), req.body.userId, sheetDoc._id);

      // Find tags that are no longer a part of the tagsArr and remove sheets
      if (difference.length > 0) {
        difference.forEach((tagName) => {
          console.log(tagName);
          Tag.updateOne(
            { tagTitle: tagName, tagCreatedBy: userId },
            { $pullAll: { sheets: [sheetDoc._id] } },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );

          Tag.findOne({ tagCreatedBy: userId, tagTitle: tagName }, (err, tagDoc) => {
            if (err) throw err;
            if (tagDoc) {
              let oldSheets = [...tagDoc.sheets];
              let index = oldSheets.findIndex((sheet) => sheet == sheetDoc._id);
              let newSheets = oldSheets.splice(index, 1);
              tagDoc.sheets = newSheets;
              tagDoc.save();
            }
          });
        });
      }

      Tag.deleteMany({ tagCreatedBy: userId, sheets: { $size: 0 } }, (err) => {
        if (err) throw err;
        console.log('Tags have been deleted.');
      });

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

    User.findOne({ id: req.body.id }, async (err, userDoc) => {
      if (err) throw err;
      if (userDoc) {
        userDoc.categories.push(newCategory._id);
      }
    });
  });
};

/**
 * POST - Adds a new tag to the database
 */
exports.add_tag = (req, res) => {
  Tag.findOne({ title: req.body.title }, async (err, tagDoc) => {
    if (err) throw err;
    if (tagDoc) {
      res.send('A tag with the same name already exists.');
    }
    if (!tagDoc) {
      const newTag = new Tag({
        title: req.body.title,
        slug: req.body.slug,
      });
    }

    await newTag.save();
    res.send('New tag created.');
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

  Tag.find({ sheets: sheetId }, async (err, sheet) => {
    if (err) throw err;
    if (sheet) {
      res.send(sheet);
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
// };

// GET Retrieves all sheets of specified category

// GET Retrieves all sheets of specified tag

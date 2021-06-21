const Sheet = require('../models/Sheet');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

// POST Adds new sheet to database
exports.add_sheet = (req, res) => {
  Sheet.findOne({ title: req.body.title }, async (err, sheetDoc) => {
    if (err) throw err;
    if (sheetDoc) {
      res.send('You already have a sheet with that title.');
    }
    if (!sheetDoc) {
      const newSheet = new Sheet({
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        dateCreated: Date.now(),
        lastUpdated: Date.now(),
        category: req.body.category,
        tags: req.body.tags,
      });
    }

    await newSheet.save();
    res.send('New sheet created.');
  });
};

// POST Adds category to database
exports.add_category = (req, res) => {
  Category.findOne({ title: req.body.title }, async (err, categoryDoc) => {
    if (err) throw err;
    if (categoryDoc) {
      res.send('A category with the same name already exists.');
    }
    if (!categoryDoc) {
      const newCategory = new Category({
        title: req.body.title,
        slug: req.body.slug,
      });
    }

    await newCategory.save();
    res.send('New category created.');
  });
};

// POST Adds tag to database
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

// GET Retrieves one sheet
exports.sheet_get = (req, res) => {
  if (req.sheet) {
    let data = req.sheet;
    res.send(data);
  } else {
    res.send(null);
  }
};

// GET Retrieves all categories

// GET Retrieves all sheets of specified category

// GET Retrieves all tags

// GET Retrieves all sheets of specified tag

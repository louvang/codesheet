const {
  add_sheet,
  edit_sheet,
  add_category,
  get_all_categories_from_user,
  get_sheet,
  get_category_by_title,
  get_category_by_id,
  get_tag_by_sheet,
  get_all_tags_from_user,
} = require('../controllers/sheets');

module.exports = (app) => {
  app.post('/api/add_sheet', add_sheet);

  app.post('/api/:userId/edit_sheet/:sheetTitle', edit_sheet);

  app.post('/api/add_category', add_category);

  app.get('/api/categories_from/:userId', get_all_categories_from_user);

  app.get('/api/:userId/sheet/:sheetTitle', get_sheet);

  app.get('/api/:userId/category/title/:categoryTitle', get_category_by_title);

  app.get('/api/:userId/category/id/:categoryId', get_category_by_id);

  app.get('/api/sheet_tags/:sheetId', get_tag_by_sheet);

  app.get('/api/tags_from/:userId', get_all_tags_from_user);
};

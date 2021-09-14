const {
  add_sheet,
  edit_sheet,
  add_category,
  get_all_categories_from_user,
  get_sheet,
  get_category_by_title,
  get_category_by_id,
  get_tag_by_sheet,
  get_tag_by_id,
  get_all_tags_from_user,
  delete_sheet,
  get_sheets_by_category,
  get_sheets_by_author,
  get_sheets_by_tagTitle,
  get_sheets_by_search,
  get_user_by_id,
} = require('../controllers/sheets');

const requireLogin = require('../middlewares/requireLogin');

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

  app.get('/api/delete_sheet/:sheetId', requireLogin, delete_sheet);

  app.get('/api/:userId/sheets_by_category/:categoryId', get_sheets_by_category);

  app.get('/api/:userId/sheets_by_author', get_sheets_by_author);

  app.get('/api/:userId/tags_by_id/:tagId', get_tag_by_id);

  app.get('/api/:userId/sheets_by_tag/:tagTitle', get_sheets_by_tagTitle);

  app.get('/api/search/:searchTerm', get_sheets_by_search);

  app.get('/api/user/:userId', get_user_by_id);
};

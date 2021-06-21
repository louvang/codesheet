const { register_post, login_post, current_user_get, logout_get } = require('../controllers/auth');

module.exports = (app) => {
  app.post('/api/register', register_post);

  app.post('/api/login', login_post);

  app.get('/api/current_user', current_user_get);

  app.get('/api/logout', logout_get);
};

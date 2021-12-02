const Router = require('@koa/router');
const messageController = require('./controllers/message.controller');
const userController = require('./controllers/user.controller');
const router = new Router();

module.exports = (io) => {
  router.post('/users', userController.login);

  router.get('/messages', messageController.getMessages);
  router.post('/messages', messageController.postMessage(io));

  return router;
}


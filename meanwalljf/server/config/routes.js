const path = require('path');

const Auth = require(path.resolve('server','controllers','auth'));
const messagesController = require(path.resolve('server','controllers', 'messages'));
const commentsController = require(path.resolve('server','controllers','comments'));

module.exports = function(app) {

  //Auth
  app.post('/login', Auth.login);
  app.post('/register', Auth.register);
  app.delete('/logout/:id', Auth.logout);
  app.get('/user', Auth.getUser);

  //Messages
  app.get('/messages',messagesController.index);
  app.post('/messages',messagesController.create);
  // app.delete('/messages/:id', messagesController.destroy);

  //Comments
  app.post('/comments',commentsController.create);
  app.delete('/comments/:id', commentsController.destroy);

};

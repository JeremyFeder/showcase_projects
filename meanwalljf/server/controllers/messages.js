const Message = require('mongoose').model('Message');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');

module.exports = {

  index(request, response) {
      Message.find({})
        .populate('_user','name')
        .populate({
          path: '_comments',
          model: 'Comment',
          populate: {
            path: '_user',
            model: 'User',
            select: 'name'
          }
        })
        .then(function(messages) {
          response.json(messages);
        })
        .catch(function(error) {
          console.log(error);
          response.status(500).json(error);
        });
  },

  create(request,response) {

    const userPromise = User.findById(request.cookies.userID);

    Message.create({ message: request.body.message, _user: request.cookies.userID })
      .then(function(message) {
        return userPromise
          .then(function(user) {
            user._messages.push(message);
            user.save();
            response.json(message);
          });
      })
      .catch(function(error) {
        response.status(500).json(error);
      });
  },

  //Add delete functionality?


};

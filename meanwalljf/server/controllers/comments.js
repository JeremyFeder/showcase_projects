const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');
const Message = require('mongoose').model('Message');

module.exports = {
  create(request,response) {
    const userPromise = User.findById(request.cookies.userID);
    const messagePromise = Message.findById(request.body.messageID);

    Comment.create({ comment: request.body.comment, _user: request.cookies.userID, _message: request.body.messageID })
      .then(function(comment) {
        return messagePromise
          .then(function(message) {
            message._comments.push(comment);
            message.save();
            return userPromise
              .then(function(user) {
                user._comments.push(comment);
                user.save();
                response.json(comment);
              });
          });
      })
      .catch(function(error) {
        console.log(error);
        response.status(500).json(error);
      });
  },

  //DELETE COMMENTS
  destroy(req, res) {
    Comment.findByIdAndRemove(req.params.id)
      .then(function() {
        res.json()
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).json(error);
      });
  }

}

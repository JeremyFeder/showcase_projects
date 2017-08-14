const User = require('mongoose').model('User');

module.exports = {
  login(request,response){
    User.findOne({ username : request.body.username })
      .then(function(user) {

        if(!user) return response.json({success: false, errorMessage: 'Incorrect Username or Password.  Have you Registered yet?'});

        if(!request.body.password) return response.json({success: false, errorMessage: 'Password is required!'});

        return User.verifyPassword(request.body.password, user.password)
          .then(function(result) {
            if(!result) return response.json({success: false, errorMessage: 'Incorrect Username or Password.  Have you Registered yet?'});
            attachSession(request, response, user);
            response.json({ success : true, user });
          });
      })
      .catch(handleError.bind(response));
  },

  register(request, response) {
    if(request.body.user === undefined) return response.json({success: false, errorMessage: 'All fields are required.  Cannot be blank!'});

    if (request.body.user.password !== request.body.passwordConf) return response.json({success: false, errorMessage: 'Password and Confirm Password must match!'});

    User.create(request.body.user)
      .then(function(user){
        attachSession(request, response, user);
        response.json({ success : true, user });
      })
      .catch(handleError.bind(response));
  },

  logout(request,response) {
    console.log('destroy user');
    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');
    response.json({success: true});
  },

  getUser(request,response) {
    User.findOne({_id : request.cookies.userID })
      .then(function(user){
        response.json({success: true, user: {_id: user._id, name: user.name}});
      })
      .catch(handleError.bind(response));
  }
};

function attachSession(request, response, user) {
  request.session.user = user;
  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 90000 * 1000);
}

function handleError(error) {
  if(error.name === 'ValidationError'){
    this.json({success: false, error : error.errors})
  }
  else {
    this.status(500).json({success: false, errorMessage: error.message});
  }
}

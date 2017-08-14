
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

  username: {
    type: String,
    required: [true, "Username cannot be blank."],
    trim: true,
    unique: [true, "There is already a User by that name."],
    minlength: 4,
    maxlength: 20,
    validate: [{
      validator : function (username){
        return /^[a-zA-Z0-9_]+$/.test(username);
      },
      message: 'Username can only contain letters, numbers, and/or underscores.'
    }],
  },

  password: {
    type: String,
    required: [true, "Password fields cannot be blank."],
    trim: true,
    minlength: [8, "Your Password must contain at least 8 characters!"],
    maxlength: 256,
  },

  name: {
    first: {
      type: String,
      required: [true, "Please enter your first name."],
      trim: true,
    },
    last: {
      type: String,
      required: [true, "Please enter your last name."],
      trim: true,
    }
  },

  _messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
  }],

  _comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],

}, { timestamps: true });

userSchema.pre('save',function(next) {
  if(!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods.passwordMatch = function(password) {
  return this.password === password;
};

userSchema.statics.verifyPassword = function(inputPassword, hashPassword) {
  return bcrypt.compare(inputPassword, hashPassword);
};

module.exports = mongoose.model('User',userSchema);

const mongoose = require('mongoose');
const Snake = mongoose.model('Snake');

module.exports = {

  //Root (index)
  root: function(req, res) {
    // Snake.find({}, function(err, results) {
    //   if(err) {console.log(err);}
    //   res.render('index', {snakes: results});
    // });
    Snake.find({})
      .then(function(snakes) {
        // console.log(snakes)
        res.render('index', {snakes});
      })
      .catch(function(err) {
        console.log(err, "could not find Snakes");
      })
  },

  //Create
  create: function(req, res) {
    console.log("POST DATA", req.body);
    // create a new Snake
    Snake.create(req.body, function(err, result){
      if(err) {console.log(err, "could not create Snake");}
      res.redirect('/');
    });
  },

  //New
  new: function(req, res) {
    res.render('new');
  },

  //Show
  show: function(req, res) {
    Snake.find({ _id: req.params.id }, function(err, response) {
      if(err) {console.log(err);}
      res.render('show', {snake: response[0]});
    });
  },

  edit: function(req, res) {
    Snake.find({ _id: req.params.id }, function(err, response) {
      if(err) {console.log(err);}
      res.render('edit', {snake: response[0]});
    });
  },

  //Update
  update: function (req, res) {
    Snake.update({ _id: req.params.id }, req.body, function(err, result) {
      if(err) {console.log(err);}
      res.redirect('/');
    });
  },

  //Delete
  destroy: function(req, res) {
    Snake.remove({ _id: req.params.id }, function(err, result) {
      if(err) {console.log(err);}
      res.redirect('/');
    });
  }
}

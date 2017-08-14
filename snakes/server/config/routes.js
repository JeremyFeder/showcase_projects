const snakes = require('../controllers/snakes.js');

module.exports = function(app) {
  
  //Root (index)
  app.get('/', function(req, res) {
    snakes.root(req, res);
  });

  //Create
  app.post('/snakes', function(req, res) {
    snakes.create(req, res);
  });

  //New
  app.get('/snakes/new', function(req, res) {
    snakes.new(req, res);
  });

  //Show
  app.get('/snakes/:id', function(req, res) {
    snakes.show(req, res);
  });

  app.get('/snakes/edit/:id', function(req, res) {
    snakes.edit(req, res);
  });

  //Update
  app.post('/snakes/:id', function (req, res) {
    snakes.update(req, res);
  });

  //Delete
  app.post('/snakes/destroy/:id', function(req, res) {
    snakes.destroy(req, res);
  });
}

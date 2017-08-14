const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client/static')));

app.set('views', path.resolve('client/views'));
app.set('view engine', 'ejs');

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

// store the function in a variable
const routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);


//listen on port specified at top and console log which one
const server = app.listen(port, function() {
  console.log(`Now listening on port ${port}`);
});

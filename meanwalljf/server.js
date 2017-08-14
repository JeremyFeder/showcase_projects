const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      path = require('path'),
      port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
      secret : 'SuperMegaTopSecretPasswordYouWontGuess999888123123',
      resave : false,
      saveUninitialized : true,
      name : 'wallAppCookie',
      cookie : {
        secure : false,
        httpOnly : false,
        maxAge : 3650000,
      }
};

app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));

app.use(cookieParser('cookieParser'));
app.use(bodyParser.json());
app.use(session(sessionConfig));

require(path.resolve('server','config','db'));

require(path.resolve('server','config','routes'))(app);

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});

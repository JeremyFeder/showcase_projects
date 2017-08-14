// require mongoose
const mongoose = require('mongoose');

//making a Snake Collection/Schema
const SnakeSchema = new mongoose.Schema({
  name: String,
  length: Number,
  venomous: Boolean
});

mongoose.model('Snake', SnakeSchema); // Setting this Schema in our Models as 'Snake'

const Snake = mongoose.model('Snake'); // Retrieving this Schema from our Models, named 'Snake'
// const Snake = mongoose.model('Snake', SnakeSchema);  //way of doing above two lines in one line

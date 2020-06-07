const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/scales');

const db = mongoose.connection;
db.on('error', console.log('Error connecting to db'));
db.once('open', () => {
  console.log('Connected to db successfully');
});

var scaleSchema = new mongoose.Schema({
  name: String,
  notes: Array
});

const getNotesForScale = (scale, callback) => {
  db.find({name: scale}).exec(callback);
};

module.exports = {
  getNotesForScale
};
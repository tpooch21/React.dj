const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/scales', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to db successfully');
});

const scaleSchema = new mongoose.Schema({
  name: String,
  notes: Array
});

const Scale = mongoose.model('Scale', scaleSchema);

const getNotesForScale = (scale, callback) => {
  console.log('Logging to make sure were here');
  Scale.find({name: scale}).exec(callback);
};

module.exports = {
  getNotesForScale
};
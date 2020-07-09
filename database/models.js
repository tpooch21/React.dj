const mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.3/scales', {useNewUrlParser: true, useUnifiedTopology: true});

const scaleSchema = new mongoose.Schema({
  name: String,
  notes: Array
});

const Scale = mongoose.model('Scale', scaleSchema);

const insertScales = (name, notes, callback) => {
  const scale = new Scale({name, notes});
  console.log('Inserting => ', name);
  scale.save((err) => {
    if (err) {
      callback(err);
    }
    console.log('saved');
  });
};

const getNotesForScale = (scale, callback) => {
  console.log('Logging to make sure were here');
  Scale.find({name: scale}).exec(callback);
};

module.exports = {
  getNotesForScale,
  insertScales
};
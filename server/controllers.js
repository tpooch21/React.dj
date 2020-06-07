const { getNotesForScale } = require('../database/models.js');

const getNotes = (req, res) => {
  getNotesForScale(req.params.name, (err, results) => {
    if (err) {
      res.status(404).end();
    }
    res.status(200).json(results[0]);
  });
};

module.exports = {
  getNotes
};
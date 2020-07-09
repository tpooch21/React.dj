const models = require('./models.js');

// Minors
models.insertScales('AMinor', ['A', 'B', 'C', 'D', 'E', 'F', 'G'], (err, results) => {if (err) {throw err}});
models.insertScales('AsharpMinor', ['A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#'], (err, results) => {if (err) {throw err}});
models.insertScales('BMinor', ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], (err, results) => {if (err) {throw err}});
models.insertScales('CMinor', ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], (err, results) => {if (err) {throw err}});
models.insertScales('CsharpMinor', ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], (err, results) => {if (err) {throw err}});
models.insertScales('DMinor', ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], (err, results) => {if (err) {throw err}});
models.insertScales('DsharpMinor', ['D#', 'F', 'F#', 'G#', 'A#', 'B', 'C#'], (err, results) => {if (err) {throw err}});
models.insertScales('EMinor', ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], (err, results) => {if (err) {throw err}});
models.insertScales('FMinor', ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], (err, results) => {if (err) {throw err}});
models.insertScales('FsharpMinor', ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], (err, results) => {if (err) {throw err}});
models.insertScales('GMinor', ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], (err, results) => {if (err) {throw err}});
models.insertScales('GsharpMinor', ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], (err, results) => {if (err) {throw err}});

// Majors
models.insertScales('AMajor', ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], (err, results) => {if (err) {throw err}});
models.insertScales('AsharpMajor', ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], (err, results) => {if (err) {throw err}});
models.insertScales('BMajor', ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], (err, results) => {if (err) {throw err}});
models.insertScales('CMajor', ['C', 'D', 'E', 'F', 'G', 'A', 'B'], (err, results) => {if (err) {throw err}});
models.insertScales('CsharpMajor', ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], (err, results) => {if (err) {throw err}});
models.insertScales('DMajor', ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], (err, results) => {if (err) {throw err}});
models.insertScales('DsharpMajor', ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], (err, results) => {if (err) {throw err}});
models.insertScales('EMajor', ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], (err, results) => {if (err) {throw err}});
models.insertScales('FMajor', ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], (err, results) => {if (err) {throw err}});
models.insertScales('FsharpMajor', ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'], (err, results) => {if (err) {throw err}});
models.insertScales('GMajor', ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], (err, results) => {if (err) {throw err}});
models.insertScales('GsharpMajor', ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], (err, results) => {if (err) {throw err}});
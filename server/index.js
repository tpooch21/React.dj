const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = 3000;
const controllers = require('./controllers.js');

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname + '/../client/public/')));

app.listen(port, () => {console.log(`Server is listening at http://localhost:${port}`)});

app.get('/scale/:name/notes', controllers.getNotes);


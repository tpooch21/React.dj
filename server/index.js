const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const pathToBundle = path.join(__dirname + '/../client/public/');
console.log(pathToBundle);

app.use(express.static(path.join(__dirname + '/../client/public/')));

app.listen(port, () => {console.log(`Server is listening at http://localhost:${port}`)});

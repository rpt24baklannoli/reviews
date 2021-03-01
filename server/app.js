//require('newrelic');
let fs = require('fs');
let fileContent = fs.readFileSync(’./node_modules/newrelic/index.js’, { encoding: ‘utf-8’ });
fileContent = fileContent.replace(“lib/config’”, “lib/config/index’”);
fs.writeFileSync(’./node_modules/newrelic/index.js’, fileContent, { encoding: ‘utf-8’, flag: ‘w’ });
const express = require('express');
const cors = require('cors');
const controller = require('./controller');

const app = express();
// const port = 3002;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/items/:itemId', express.static('client/dist'));

// FEC GET
app.get('/api/items/:itemId/reviews', (req, res) => {
  controller.reviews.get(req, res);
});

// SDC POST
app.post('/api/items/:itemId/reviews', (req, res) => {
  controller.reviews.post(req, res);
});

// SDC DELETE
app.delete('/api/items/:itemId/reviews/:reviewId', (req, res) => {
  controller.reviews.delete(req, res);
});

// SDC PUT/UPDATE
app.put('/api/items/:itemId/reviews/:reviewId', (req, res) => {
  controller.reviews.put(req, res);
});

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Listening at http://localhost:${port}`);
// });

module.exports = app;

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const connectToDB = require('./db/db');
const appRoutes = require('./appRoutes');

const app = express();

connectToDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', appRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

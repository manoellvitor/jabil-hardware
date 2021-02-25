const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');

const env = require('./config/env');
const router = require('./routers/routes');

// Database Population
const databaseFiller = require('./helpers/databaseFiller');

// Server PORT
const PORT = env.server.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use(express.static('resources'));
app.use('/css', express.static(__dirname + 'resources/css'));
app.use('/images', express.static(__dirname + 'resources/images'));
app.use('/js', express.static(__dirname + 'resources/js'));

// Template Engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Midleware
app.use(cors());
app.use(morgan('tiny'));

// Routes
app.use('/', router);

// Server Start
app.listen(PORT, () => {
  try {
    axios
      .get('https://api.github.com/users/manoellvitor')
      .then((res) => {
        if (res.data.company === 'Jabil') {
          console.log(`Server Running at - http://localhost:${PORT}`);
        } else {
          process.exit();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err.message);
  }
});

const express = require('express');
app = express();

require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api', require('./routes/api'));

// Initialization
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
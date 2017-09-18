'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// conecta no banco mongo
mongoose.connect('mongodb://nodeapi:nodeapi@ds036967.mlab.com:36967/mynodeapi');

// models
const Product = require('./models/Product');

// routes
const indexRoute = require('./routes/index.route');
const productRoute = require('./routes/product.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
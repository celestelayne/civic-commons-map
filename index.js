'use strict'

const express = require('express');
const app = express();
const logger = require('morgan')
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(logger('dev'))

app.get('/', (req, res) => {
	res.render('index');
})

const server = app.listen(PORT, () => {
	console.log('this works on port 4000')
})

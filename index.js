const express = require("express");
const app = express();

let path = require('path');

const {viewsRouter} = require('./src/router/views.routes');

const HTML_DIR = path.join(__dirname, '/public/')
app.use(express.static(HTML_DIR))

app.use('/', viewsRouter);

app.listen(process.env.PORT || 3000);


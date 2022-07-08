const express = require("express");
const viewsRouter = express.Router();
var path = require('path');

viewsRouter.get("/", function (_, res) {
  res.sendFile(path.resolve('./public/views/home.html'));
});

viewsRouter.get("/feed", function (_, res) {
  res.sendFile(path.resolve('./views/feed.html'));
});

viewsRouter.get("/amigos", function (_, res) {
  res.sendFile(path.resolve('./views/amigos.html'));
});

viewsRouter.get("/configuracoes", function (_, res) {
  res.sendFile(path.resolve('./views/config.html'));
});



/*   */

module.exports = {
  viewsRouter
};


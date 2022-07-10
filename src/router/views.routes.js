const express = require("express");
const viewsRouter = express.Router();
var path = require('path');

viewsRouter.get("/", function (_, res) {
  res.sendFile(path.resolve('./public/views/home.html'));
});

viewsRouter.get("/meu-perfil", function (_, res) {
  res.sendFile(path.resolve('./public/views/my-profile.html'));
});

viewsRouter.get("/categorias", function (_, res) {
  res.sendFile(path.resolve('./public/views/my-profile.html'));
});

viewsRouter.get("/meus-ganhos", function (_, res) {
  res.sendFile(path.resolve('./public/views/my-earnings.html'));
});

viewsRouter.get("/personalizar", function (_, res) {
  res.sendFile(path.resolve('./public/views/custom.html'));
});

viewsRouter.get("/configuracoes", function (_, res) {
  res.sendFile(path.resolve('./public/views/settings.html'));
});

viewsRouter.get("/sair", function (_, res) {
  res.sendFile(path.resolve('./public/views/sign-out.html'));
});


/*   */

module.exports = {
  viewsRouter
};


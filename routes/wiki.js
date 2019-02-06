var express = require('express');
var router = express.Router()
var models = require('../models');
var Page = models.Page;
var User = models.User;


// rutas de wiki

router.get('/', function (req, res, next) {
  res.redirect('/');
});
router.post('/', function (req, res, next) {
  // agregá definiciones para  `title` y `content`
  User.create({
    name: req.body.name,
    email: req.body.email
  })
    .then((newUser) => {
      return Page.create({
        title: req.body.title,
        content: req.body.content,
      })
        .then((newPage) => {
          console.log('NEW PAGE', newPage)
          newPage.setAutor(newUser)
          return newPage
        })
    })
    .then(savedPage => {
      console.log(savedPage.urlTitle)
      res.redirect(savedPage.route); // route virtual FTW
    })
    .catch(next);
});
router.get('/add', function (req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (foundPage) {
      console.log('respuesta ', foundPage.title)
      res.render('wikipage', { foundPage })
    })
    .catch(next);
});

module.exports = router;
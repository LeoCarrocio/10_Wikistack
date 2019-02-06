var express = require('express');
var router = express.Router()
const wikiRouter = require('./wiki');
const UserRouter = require('./user');


router.use('/wiki', wikiRouter);
router.use('/user', UserRouter);

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router;
// requiere todas mis rutas y las exporta
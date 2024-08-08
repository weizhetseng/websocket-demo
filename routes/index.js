const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/admin', function (req, res, next) {
  res.render('admin', { title: 'Express-admin' })
})

module.exports = router

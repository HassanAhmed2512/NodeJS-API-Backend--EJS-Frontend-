const router = require('express').Router()

const homecontroller = require('../controllers/home.controllers')

router.get('/',homecontroller.getHome)

module.exports = router
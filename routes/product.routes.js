const router = require('express').Router()
const bodyparser = require('body-parser')

const productcontroller = require('../controllers/product.controllers')
const protection = require('./protection/auth.gard')


router.get( '/:id' ,productcontroller.getProduct)

router.post('/delete',
bodyparser.urlencoded({extended:true}),
protection.admin,
productcontroller.postdelete
)


module.exports = router
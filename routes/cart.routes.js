const router = require('express').Router()
const bodyparser = require('body-parser')
const check = require('express-validator').check


const cartcontroller = require('../controllers/cart.controllers')
const protection = require('./protection/auth.gard')

router.get('/',
protection.user,
cartcontroller.getcart
)

router.post('/',
protection.user,
bodyparser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required').isInt({min:1}).withMessage('you can\'t add 0'),  
cartcontroller.postcart
)

router.post('/save',
bodyparser.urlencoded({extended:true}),
check('amount').not().isEmpty().withMessage('amount is required').isInt({min:1}).withMessage('you can\'t not add 0'),  
protection.user,
cartcontroller.postsave
)

router.post('/delete',
bodyparser.urlencoded({extended:true}),
protection.user,
cartcontroller.postdelete
)

router.post('/deleteall',
bodyparser.urlencoded({extended:true}),
protection.user,
cartcontroller.postdeleteall
)



module.exports = router
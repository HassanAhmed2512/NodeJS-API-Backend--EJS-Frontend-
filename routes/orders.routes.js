const router = require('express').Router()
const bodyparser = require('body-parser')


const orderscontroller = require('../controllers/orders.controllers')
const protection = require('./protection/auth.gard')

router.get('/',
protection.user,
orderscontroller.getorders
)

router.post('/delete',
bodyparser.urlencoded({extended:true}),
protection.user,
orderscontroller.postdelete
)

router.post('/deleteall',
bodyparser.urlencoded({extended:true}),
protection.user,
orderscontroller.postdeleteall
)

router.post('/',
bodyparser.urlencoded({extended:true}),
protection.user,
orderscontroller.postorder
)









module.exports = router
const router = require('express').Router()

const bodyparser = require('body-parser')

const check = require('express-validator').check

const protection =require('./protection/auth.gard')

const authcontroller = require('../controllers/auth.controllers')

router.get('/signup', protection.notuser ,authcontroller.getSignup)

router.get('/signin', protection.notuser , authcontroller.getSignin)

router.post('/signup',
bodyparser.urlencoded({extended:true}),
check('username').not().isEmpty().withMessage('there is no username'),
check('email').isEmail().withMessage('email is roung'),
check('password').isLength({min:6}).withMessage('password roung'),
check('confirmpassword').custom((value,{req})=>{
    if (value === req.body.password) return true
    else throw 'password not equal'
}),
authcontroller.postSignup )

router.post('/signin',
bodyparser.urlencoded({extended:true}),
check('email').isEmail().withMessage('email is roung'),
check('password').isLength({min:6}).withMessage('password roung'),
authcontroller.postSignin )

router.all('/logout', protection.user ,authcontroller.Logout)


module.exports = router
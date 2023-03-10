const authtsmodel =require('../models/auth.model')
const validationres = require('express-validator').validationResult

exports.getSignup =(req,res,next)=>{
    res.render('signup',{
        vaildation : req.flash('vaildationsignup'),
        isUser: req.session.userId,
        isAdmin :req.session.isAdmin,
        PageTitle:'SignUp'
    })
}

exports.getSignin =(req,res,next)=>{
    res.render('signin',{
        vaildation : req.flash('vaildationsignin'),
        isUser: req.session.userId,
        isAdmin :req.session.isAdmin,
        PageTitle:'SignIn'
    })
}

exports.postSignup =(req,res,next)=>{
    if(validationres(req).isEmpty()){
    authtsmodel
    .CreateNewUser(req.body.username,req.body.email,req.body.password)
    .then(()=> res.redirect('/signin'))
    .catch((err) => { 
        console.log(err) 
        res.redirect('/signup') })
    }
    else{
        req.flash('vaildationsignup',validationres(req).array())
        res.redirect('/signup')
    }
}

exports.postSignin =(req,res,next)=>{
    if(validationres(req).isEmpty()){
    authtsmodel
    .Signin(req.body.email,req.body.password)
    .then((result)=> {
        req.session.userId =result.id
        req.session.isAdmin =result.isAdmin
        res.redirect('/')
    })
    .catch( err => {
        res.redirect('/signin')
    })
}
    else{
        req.flash('vaildationsignin',validationres(req).array())
        res.redirect('/signin')

    }
}

exports.Logout = (req,res,next) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
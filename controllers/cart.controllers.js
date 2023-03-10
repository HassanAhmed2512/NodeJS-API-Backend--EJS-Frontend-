const cartmodel =require('../models/cart.model')
const validationres = require('express-validator').validationResult

exports.getcart = (req,res,next)=>{
    cartmodel.getItemsbyUser(req.session.userId)
    .then( items =>{
        res.render('cart',{
            items : items,
            isUser: req.session.userId,
            vaildationcart :  req.flash('vaildationCartSave')[0] ,
            isAdmin :req.session.isAdmin,
            PageTitle:'Cart'
        })
    })
    .catch(err =>{res.redirect("/error")})
}

exports.postcart =(req,res,next) =>{
    if(validationres(req).isEmpty()){
        
        cartmodel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        })
        .catch( err=>{
            res.redirect("/error")
        })
    }else{
        req.flash('vaildationcart',validationres(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postsave =(req,res,next) =>{
    if(validationres(req).isEmpty()){
        cartmodel.edititem(req.body.cartId,{
            amount: req.body.amount,
            timestamp: Date.now()
        })
        .then(()=>{res.redirect('/cart')})
        .catch((err) =>{res.redirect("/error")})
    }else{
        req.flash('vaildationCartSave',validationres(req).array())
        res.redirect('/cart')
    }

}

exports.postdelete =(req,res,next) =>{
        cartmodel.deleteitem(req.body.cartId)
        .then(()=>{res.redirect('/cart')})
        .catch((err) =>{res.redirect("/error")})
}

exports.postdeleteall =(req,res,next) =>{
    cartmodel.deleteallitem()
    .then(()=>{res.redirect('/cart')})
    .catch((err) =>{res.redirect("/error")})
}
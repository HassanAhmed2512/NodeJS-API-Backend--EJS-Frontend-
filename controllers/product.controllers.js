const productsmodel = require('../models/product.model')

exports.getProduct = (req,res,next)=>{
    let id = req.params.id
    productsmodel.getProductById(id).then((product) =>{
        res.render( 'product' ,{
            product : product,
            isUser: req.session.userId,
            vaildationcart :  req.flash('vaildationcart')[0] ,
            isAdmin :req.session.isAdmin,
            PageTitle:'ProductPage'
        })
    })
}

exports.postdelete =(req,res,next) =>{
    productsmodel.deleteitem(req.body.productId)
    .then(()=>{res.redirect('/')})
    .catch((err) =>{res.redirect("/error")})
}

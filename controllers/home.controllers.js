const productsmodel =require('../models/product.model')
exports.getHome= (req,res,next) =>{
    
    let category = req.query.category
    let validcategory = ['t-shirts','pants','boots','jackets','coats','shoes','skirt','dress']

    if(category && validcategory.includes(category)){
        productsmodel.getAllProductCategory(category).then(products =>{
            res.render('index',{
                products:products,
                isUser: req.session.userId,
                vaildationcart :  req.flash('vaildationcart')[0] ,
                isAdmin :req.session.isAdmin,
                PageTitle:'Home'
            })
        })
    }
    else{
        productsmodel.getAllProduct().then(products =>{
            res.render('index',{
                products,products,
                isUser: req.session.userId,
                vaildationcart :  req.flash('vaildationcart')[0] ,
                isAdmin :req.session.isAdmin,
                PageTitle:'Home'
            })
        })
    }
}
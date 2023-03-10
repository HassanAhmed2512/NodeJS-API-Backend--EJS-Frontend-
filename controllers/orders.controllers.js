const ordersmodel =require('../models/orders.model')

exports.getorders = (req,res,next)=>{
    ordersmodel.getOrdersbyUser(req.session.userId)
    .then( items =>{
        res.render('orders',{
            items : items,
            isUser: req.session.userId,
            isAdmin :req.session.isAdmin,
            PageTitle:'Orders'
        })
    })
    .catch(err =>{res.redirect("/error")})
}

exports.postorder =(req,res,next) =>{
    ordersmodel.addNewOrder({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            state: "waiting",
            timestamp: Date.now()
        }).then(()=>{
            res.redirect('/orders')
        })
        .catch( err=>{
            res.redirect("/error")
        })
    
}

exports.postdelete =(req,res,next) =>{
    ordersmodel.deleteorder(req.body.orderId)
        .then(()=>{res.redirect('/orders')})
        .catch((err) =>{res.redirect("/error")})
}

exports.postdeleteall =(req,res,next) =>{
    ordersmodel.deleteallorders()
    .then(()=>{res.redirect('/orders')})
    .catch((err) =>{res.redirect("/error")})
}
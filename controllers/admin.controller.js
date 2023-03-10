const productmodel = require("../models/product.model");
const ordersmodel = require("../models/orders.model");
const validationres = require("express-validator").validationResult;


exports.getaddproduct = (req, res, next) => {
  res.render("addproduct", {
    vaildation: req.flash("vaildationaddproduct"),
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    PageTitle:'AdminAddProduct'
  });
};

exports.postadd = (req, res, next) => {
  if (validationres(req).isEmpty()) {
    productmodel
      .addNewProduct({
        name: req.body.name,
        image: req.file.filename,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.redirect("/error")  
      });
  } else {
    req.flash("vaildationaddproduct", validationres(req).array());
    res.redirect("/admin/add");
  }
};

exports.getorders = (req, res, next) => {
  ordersmodel
    .getallOrders()
    .then((items) => {
      res.render("adminorders", {
        items: items,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        PageTitle:'AdminOrders'
      });
    })
    .catch((err) => {
      res.redirect("/error")  
    });
};

exports.postsave =(req,res,next) =>{
    ordersmodel.editorder(req.body.orderId,{
            state: req.body.state,
            timestamp: Date.now()
        })
        .then(()=>{res.redirect('/admin/orders')})
        .catch((err) =>{ 
          res.redirect("/error")  
      })
}

exports.postdelete =(req,res,next) =>{
    ordersmodel.deleteorder(req.body.orderId)
    .then(()=>{res.redirect('/admin/orders')})
    .catch((err) =>{     
         res.redirect("/error")  
  })
}

exports.postdeleteall =(req,res,next) =>{
    ordersmodel.deleteallorders()
    .then(()=>{res.redirect('/admin/orders')})
    .catch((err) =>{res.redirect("/error")})
}



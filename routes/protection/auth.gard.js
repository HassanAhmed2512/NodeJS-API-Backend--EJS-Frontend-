exports.user =(req,res,next) =>{
    if(req.session.userId)  next()
    else res.redirect('/signin')
}

exports.notuser =(req,res,next) =>{
    if(!req.session.userId)  next()
    else res.redirect('/')
}

exports.admin =(req,res,next) =>{
    if(req.session.isAdmin)  next()
    else res.redirect('/')
}


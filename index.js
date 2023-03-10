const express = require('express')
const path =require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const port = process.env.PORT || 5000 ;

const homeRouter = require('./routes/home.routes')
const productRouter = require('./routes/product.routes')
const authRouter = require('./routes/auth.routes')
const cartRouter = require('./routes/cart.routes')
const adminRouter = require('./routes/admin.routes')
const orederRouter = require('./routes/orders.routes')


const app = express()
app.listen(port )

app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))
app.use(flash())

const STORE = new SessionStore({
    uri:'mongodb+srv://HassanAhmed:taF7RqWkhX3e2xDI@cluster0.ywl7jrb.mongodb.net/online-shop?retryWrites=true&w=majority',
    collection: 'session'
})

    app.use(session({
        secret:'this is a dummy text for secret session',
        saveUninitialized:false,
        store:STORE
    }))
    
app.set('view engine','ejs')
app.set('views','views') // default

    app.use('/',homeRouter)
    app.use('/',authRouter)
    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/admin', adminRouter)
    app.use('/orders', orederRouter)
    app.get('/error',(req,res,next) =>{
        res.render('error',{
            isUser :req.session.userId,
            isAdmin : req.session.isAdmin
        })
    })

    app.use((req,res,next) =>{
        res.render('notfound',{
            isUser :req.session.userId,
            isAdmin : req.session.isAdmin,
            PageTitle:'Page Not Found'
        })
    })





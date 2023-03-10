const router = require('express').Router()
const bodyparser = require('body-parser')

const check = require('express-validator').check
const admincontroller = require('../controllers/admin.controller')
const protection = require('./protection/auth.gard')
const multer = require('multer')

router.get('/add',protection.admin ,admincontroller.getaddproduct);

router.post('/add',protection.admin,
multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
                cb(null,'images')
        },
        filename:(req,file,cb)=>{
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'),
check('image').custom((value,{req})=>{
    if(req.file) return true
    else throw 'image is required'
}),
check('name').not().isEmpty().withMessage('there is no name'),
check('price').not().isEmpty().withMessage('there is no number'),
check('description').not().isEmpty().withMessage('there is no description')
,admincontroller.postadd);

router.get('/orders',protection.admin ,admincontroller.getorders);

router.post('/saveorder',bodyparser.urlencoded({extended:true})
,protection.admin,admincontroller.postsave)

router.post('/deleteorder',bodyparser.urlencoded({extended:true})
,protection.admin,admincontroller.postdelete)


router.post('/deleteall',protection.admin,admincontroller.postdeleteall)



module.exports = router
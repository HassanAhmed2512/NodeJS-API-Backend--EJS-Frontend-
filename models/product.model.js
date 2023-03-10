const mongoose = require('mongoose')
const fs = require('fs'); 


const DB_URL = 'mongodb+srv://HassanAhmed:taF7RqWkhX3e2xDI@cluster0.ywl7jrb.mongodb.net/online-shop?retryWrites=true&w=majority'

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String
})

const Product = mongoose.model('product',productSchema)

exports.getAllProduct = () =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL).then(()=>{
            return  Product.find({})
          }).then(data =>{
              mongoose.disconnect()
              resolve(data)
          }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getAllProductCategory = (category) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL).then(()=>{
            return  Product.find({category:category})
          }).then(data =>{
              mongoose.disconnect()
              resolve(data)
          }).catch(err => reject(err))
    })
}

exports.getProductById = (id) =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL).then(()=>{
            return  Product.findById(id)
          }).then(data =>{
              mongoose.disconnect()
              resolve(data)
          }).catch(err => reject(err))
    })
}

exports.addNewProduct = data =>{
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL).then(()=>{
            let product = new Product({
                name:data.name,
                image:data.image,
                price:data.price,
                description:data.description,
                category:data.category
            })
            return product.save()
          })
          .then(()=>{
            mongoose.disconnect()
            resolve()
          }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.deleteitem = (id) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(DB_URL)
        .then(() => Product.findOneAndDelete({_id: id}))
        .then((data) => {
            fs.unlink(`images/${data.image}`, (err) => {
                if (err) {
                  console.log(err);
                }
              });
          mongoose.disconnect();
          resolve();
        })
        .catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  };
  

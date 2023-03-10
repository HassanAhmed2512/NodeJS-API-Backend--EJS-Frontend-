const mongoose = require("mongoose");

const DB_URL = 'mongodb+srv://HassanAhmed:taF7RqWkhX3e2xDI@cluster0.ywl7jrb.mongodb.net/online-shop?retryWrites=true&w=majority'

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
});

const Cartitem = mongoose.model("cart", cartSchema);

// exports.addNewItem = (data) => {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(DB_URL)
//       .then(() => {
//         let item = new Cartitem(data);
//         return item.save();
//       })
//       .then(() => {
//         mongoose.disconnect();
//         resolve();
//       })
//       .catch((err) => {
//         mongoose.disconnect();
//         reject(err);
//       });
//   });
// };

exports.getItemsbyUser = userId => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Cartitem.find({ userId: userId } ,{},{sort:{timestamp: 1}}))
      .then((items) => {
        mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.edititem = (id,data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Cartitem.updateOne({_id:id},data))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteitem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Cartitem.findOneAndDelete({_id: id}))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.deleteallitem = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Cartitem.deleteMany({}))
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        // Find the item with the given item ID
        return Cartitem.findOne({ productId: data.productId });
      })
      .then((existingItem) => {
        if (existingItem) {
          // If the item already exists, update the quantity
         let newamount = +existingItem.amount + +data.amount;
          return Cartitem.updateOne({productId:data.productId},{amount:newamount});
        } else {
          // If the item does not exist, create a new one
          let item = new Cartitem(data);
          return item.save();
        }
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};


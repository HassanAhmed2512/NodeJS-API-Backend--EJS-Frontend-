const mongoose = require("mongoose");

const DB_URL = 'mongodb+srv://HassanAhmed:taF7RqWkhX3e2xDI@cluster0.ywl7jrb.mongodb.net/online-shop?retryWrites=true&w=majority'

const orderSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  state: String,
  timestamp: Number,
});

const orderitem = mongoose.model("order", orderSchema);


exports.getOrdersbyUser = userId => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => orderitem.find({ userId: userId } ,{},{sort:{timestamp: 1}}))
      .then((Orders) => {
        mongoose.disconnect();
        resolve(Orders);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getallOrders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => orderitem.find({} ,{},{sort:{timestamp: 1}}))
      .then((Orders) => {
        mongoose.disconnect();
        resolve(Orders);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};


exports.editorder = (id,data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => orderitem.updateOne({_id:id},data))
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

exports.deleteorder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => orderitem.findOneAndDelete({_id: id}))
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

exports.deleteallorders = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => orderitem.deleteMany({}))
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

exports.addNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let order = new orderitem(data);
        return order.save();
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


//[SECTION] Dependencies and Modules
const mongoose = require("mongoose");

//[SECTION] Schema for Products
const orderSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "userId is required!"]
  },

  soldTo: {
    type: String,
    required: [true, "SoldTo is required!"]
  },
  
  products: [
    {

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "ProductId is required!"]
      },

      quantity: {
        type: Number,
        required: [true, "Quantity is required!"]
      },
    }
  ],

  totalAmount: {
    type: Number,
    required: [true, "Total amount is required!"]
  },

  purchasedOn: {
      type: Date,
      default: Date.now() 
    }
});

module.exports = mongoose.model("Order", orderSchema);

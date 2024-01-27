//[SECTION] Dependencies and Modules
const mongoose = require("mongoose");

//[SECTION] Schema for Products
const productSchema = new mongoose.Schema({
    
    breed: {
        type: String,
        required: [true, "Breed is Required"]
    },

    description: {
        type: String,
        required: [true, "Description is Required"]
    },
    
    image: {
        type: String, 
        required: [true, "Image URL is Required"]
    },

    price: {
        type: Number,
        required: [true, "Price is Required"]
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    createdOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Product", productSchema);

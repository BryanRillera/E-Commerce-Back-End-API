// [SECTION] Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// [SECTION] Add Product
module.exports.addProduct = async (req, res) => {
    try {
        let newProduct = new Product({
            breed: req.body.breed,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
        });

        const product = await newProduct.save();
        res.send(true);
    } catch (error) {
        console.error(error);
        res.send(false);
    }
};


// [SECTION] Retrieve all Product
module.exports.getAllProduct = (req, res) => {

    return Product.find({}).then(result => {

        return res.send(result);

    });

}

// [SECTION] Retrieve all Active Product
module.exports.getAllActiveProduct = (req, res) => {

    return Product.find({ isActive: true }).then(result => {

        return res.send(result);

    });

}

// [SECTION] Retrieve single product
module.exports.getProduct = (req, res) => {

    return Product.findById(req.params.productId).then(result => {

        return res.send(result);

    });

}


// [SECTION] Update product information (Admin Only)
module.exports.updatedProduct = (req, res) => {

    let updatedProduct = {
        breed: req.body.breed,
        description: req.body.description,       
        image: req.body.image,
        price: req.body.price
    }

    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((result, error) => {

        // Product not updated
        if(error){

            return res.send(false);

        // Product updated successfully
        } else {
            return res.send(true);
        }
    })  
}


// [SECTION] Archiving a product (Admin Only)
module.exports.archiveProduct = (req, res) => {

    // Archiving the product
    let archivedProduct = {

        isActive: false

    }

    return Product.findByIdAndUpdate(req.params.productId, archivedProduct).then((result, error) => {

        // Product not archived 
        if(error){

            return res.send(false);

        // Product archived
        } else {

            return res.send(true);

        }
    })
    .catch(err => res.send(err));
}

// [SECTION] Activiting a product (Admin Only)
module.exports.activateProduct = (req, res) => {

    // activating the product
    let activatedProduct = {

        isActive: true

    }

    return Product.findByIdAndUpdate(req.params.productId, activatedProduct).then((result, error) => {

        // Product not activated 
        if(error){

            return res.send(false);

        // Product activated    
        } else {

            return res.send(true);

        }
        
    })
    .catch(err => res.send(err));
}

module.exports.searchDogBreed = async (req, res) => {
  try {
    const { breed } = req.body;

    const products = await Product.find({
      breed: { $regex: breed, $options: 'i' }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// [SECTION]Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// External Route
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");

// [SECTION]Environment setup
const port = 4004;

// [SECTION]Server setup
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// [SECTION] Database Connection
// Connect to our MongoDB database
mongoose.connect("mongodb+srv://rillerabryanchristian:admin123@cluster0.jki2nck.mongodb.net/capstone_ecommerce_API?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas."))

// [SECTION] Backend Routes
app.use("/b4/users", userRoutes);
app.use("/b4/products", productRoutes);
app.use("/b4/orders", orderRoutes);
app.use("/b4/carts", cartRoutes);

// [SECTION] Server Gateway Response
if(require.main === module){
	app.listen(port, () => {
		console.log(`API is now online on port ${port}`);
	})
}

module.exports = {app, mongoose};
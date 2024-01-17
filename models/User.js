//[SECTION]Dependencies and modules
const mongoose = require("mongoose");

//[SECTION]Schema Blueprint
const userSchema = new mongoose.Schema({
	firstName: {
		type : String,
		required : [true, "First name is required"]
	},
	lastName: {
		type : String,
		required : [true, "Last name is required"]
	},
	email: {
		type : String,
		required : [true, "Email is required"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile Number is required!"]
	},
	password: {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin: {
		type : Boolean,
		default : false
	}
	
});

//[SECTION]Export Models
module.exports  = mongoose.model("User", userSchema);
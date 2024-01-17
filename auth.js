// [SECTION] Dependecies and Modules
const jwt = require("jsonwebtoken");

// Used in the algorithm for ecrypting our data which makes it difficult to decode.
const secret = "CapstoneEcommerceAPI";

// [SECTION] Token Creation

module.exports.createAccessToken = (user) => {

	// When the user logs in, a token will be created with user's information.
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}
	
	return jwt.sign(data, secret, {});
}

// [SECTION] Token Verification

module.exports.verify = (req, res, next) => {

	// This is provided in postman under
		// Authorization > Bearer Token
	console.log(req.headers.authorization);

	let token = req.headers.authorization;

	// Check if the token (JWT) exists
	if(typeof token === "undefined"){

		// If the token doesn't exists
		return res.send({ auth: "Failed. No Token" });
	} else {

		console.log(token);
		
 		token = token.slice(7, token.length);

		console.log(token)

		jwt.verify(token, secret, function(err, decodedToken){

			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})
			} else {

				console.log(decodedToken) 
				
				req.user = decodedToken;
				
				next();
			}

		});
	}
}

// [SECTION] verifyAdmin - Verify if the logged in user is an Admin
module.exports.verifyAdmin = (req, res, next) => {

	if(req.user.isAdmin){

		next();

	} else {

		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})

	}
}
// [SECTION] Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// [SECTION] Check if the email already exists
module.exports.checkEmailExists = (req, res) => {

    return User.find({ email: req.body.email }).then(result => {

        if(result.length > 0) {
            
            return res.send(true);

        } else {

            return res.send(false);
        }
    });
}

// [SECTION] User registration
module.exports.registerUser = (req, res) => {

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    return newUser.save().then((user, error) => {

        if(error){

            return res.send(false);

        } else {

            return res.send(true);
        }
    })

}

// [SECTION] User Authentication
module.exports.loginUser = (req, res) => {

    return User.findOne({ email: req.body.email }).then(result => {

        if(result == null){
        
            return res.send(false);

        } else {
            
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if(isPasswordCorrect) {

                return res.send({ access: auth.createAccessToken(result) })

            } else {

                return res.send(false);
            }

        }

    });

}

// [SECTION] Retrieve user details
module.exports.getProfile = (req, res) => {

    return User.findById(req.user.id).then(result => {

        result.password = "";

        return res.send(result);

    })
    .catch(error => res.send(error));
}

// [SECTION] Controller to update admin status
module.exports.updateStatus = async (req, res) => {
    try {
      const { id } = req.body;
      
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the isAdmin property to true
      user.isAdmin = true;

      // Save the updated user
      await user.save();

      return res.send(true);
    } catch (error) {
      console.error('Error updating isAdmin:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.resetPassword = async (req, res) => {
    try {
      const { newPassword } = req.body;
      const { id } = req.user; // Extracting user ID from the authorization header

      // Hashing the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Updating the user's password in the database
      await User.findByIdAndUpdate(id, { password: hashedPassword });

      // Sending a success response
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  // Controller function to update the user profile
  module.exports.updateProfile = async (req, res) => {
    try {
      // Get the user ID from the authenticated token
      const userId = req.user.id;

      // Retrieve the updated profile information from the request body
      const { firstName, lastName, mobileNo } = req.body;

      // Update the user's profile in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, mobileNo },
        { new: true }
      );

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  };
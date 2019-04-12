// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our Pass model
module.exports = function(sequelize, DataTypes) {
  var Pass = sequelize.define("Pass", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our Pass model. This will check if an unhashed password entered by the Pass can be compared to the hashed password stored in our database
  Pass.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // addHooks are automatic methods that run during various phases of the Pass Model lifecycle
  // In this case, before a Pass is created, we will automatically hash their password
  Pass.addHook("beforeCreate", function(Pass) {
    Pass.password = bcrypt.hashSync(Pass.password, bcrypt.genSaltSync(10), null);
  });
  return Pass;
};

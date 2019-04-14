module.exports = function(sequelize, DataTypes) {
  var Gif = sequelize.define("Gif", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    wins: {
      type: DataTypes.INTEGER,
      default: 0,
    }
  });

  Gif.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Gif.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Gif;
};

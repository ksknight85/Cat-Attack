module.exports = function(sequelize, DataTypes) {
  var Gif = sequelize.define("Gif", {
    gif_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      
    },
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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW()
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



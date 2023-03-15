'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
          { foreignKey: 'ownerId' }
      );
      Spot.hasMany(
        models.Booking,
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      );
      Spot.hasMany(
        models.Review,
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      );
      Review.hasMany(
        models.SpotImage,
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      );
    }
  }
  Spot.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        validate: {
          isNumeric: true, //how specific # of decimals?
        }
      },
      lng: {
        type: DataTypes.INTEGER,
        //allowNull: false,
        validate: {
          isNumeric: true, //how specific # of decimals?
        }
      },
      name: {
        type: DataTypes.STRING,
        //allowNull: false,
        validate: {
          len: [1, 49]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true, //how specific # of decimals?
        }
      },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};

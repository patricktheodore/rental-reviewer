const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:  {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    property_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'property',
            key: 'id'
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {min: 0, max: 5},
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;

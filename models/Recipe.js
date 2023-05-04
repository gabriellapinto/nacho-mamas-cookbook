const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { };

Recipe.init(
    {
        //field/column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        }
    },
    {
        //configuration / options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Recipe'
    }
);

module.exports = Recipe;
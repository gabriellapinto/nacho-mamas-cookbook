const { Model, DataTypes } = require('sequelize');
<<<<<<< HEAD
=======
const User = require('./User');
>>>>>>> main
const sequelize = require('../config/connection');

class Recipe extends Model { };

Recipe.init(
    {
<<<<<<< HEAD
        //field/column definitions
=======
>>>>>>> main
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
<<<<<<< HEAD
            autoIncrement: true 
        }
    },
    {
        //configuration / options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Recipe'
=======
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe'
>>>>>>> main
    }
);

module.exports = Recipe;
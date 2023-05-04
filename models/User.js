const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { };

User.init(
    {
        //field/column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        name: {
            type: DataType.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STING,
            allowNull: false
        }
    },
    {
        //configuration / options
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { };

User.init(
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
=======
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        }
    },
    {
>>>>>>> main
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
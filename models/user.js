const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.STRING(64),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        pw: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING(64)
        },
        email: {
            type: DataTypes.STRING(64),
            unique: true
        },
        name: {
            type: DataTypes.STRING(64)
        },
        gender: {
            type: DataTypes.BOOLEAN
        },
        major: {
            type: DataTypes.STRING(64)
        },
        student_number: {
            type: DataTypes.STRING(64)
        },
        birth: {
            type: DataTypes.DATE
        },
        phone_num: {
            type: DataTypes.STRING(64)
        },
        isAdmin: {
            type: DataTypes.BOOLEAN
        }
    },{
        tableName: 'user',
        timestamps: false
    })
}
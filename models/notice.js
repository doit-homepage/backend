const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notice', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        header: {
            type: DataTypes.STRING(50)
        },
        writer: {
            type: DataTypes.STRING(64),
            reference:{
                model: "user",
                key: "id"
            }
        },
        date: {
            type: DataTypes.DATE
        },
        content: {
            type: DataTypes.STRING(500)
        },
        picture: {
            type: DataTypes.STRING(150)
        },
        file: {
            type: DataTypes.STRING(150)
        }
    },{
        tableName: 'notice',
        timestamps: false
    })
}
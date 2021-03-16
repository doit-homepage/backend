const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('noticeLike', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        user_id: {
            type: DataTypes.STRING(64),
            unique: true,
            reference:{
                model: "user",
                key: "id"
            }
        },
        notice_id: {
            type: DataTypes.INTEGER,
            unique: true,
            reference:{
                model: "notice",
                key: "id"
            }
        }
    },{
        tableName: 'noticeLike',
        timestamps: false
    })
}
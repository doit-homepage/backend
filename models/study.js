const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('study', {
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
            unique: true,
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
        student_num: {
            type: DataTypes.INTEGER
        },
        start_date: {
            type: DataTypes.DATE
        }, 
        end_date: {
            type: DataTypes.DATE
        },
        is_end: {
            type: DataTypes.BOOLEAN
        }
    },{
        tableName: 'study',
        timestamps: false
    })
}
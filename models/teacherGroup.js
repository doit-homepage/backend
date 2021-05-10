const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('teacherGroup', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        teacher_id: {
            type: DataTypes.STRING(64),
            references:{
                model: "user",
                key: "id"
            }
        },
        study_id: {
            type: DataTypes.INTEGER,
            references:{
                model: "study",
                key: "id"
            }
        }
    },{
        tableName: 'teacherGroup',
        timestamps: false
    })
}
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studyGroup', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        student_id: {
            type: DataTypes.STRING(64),
            unique: true,
            reference:{
                model: "user",
                key: "id"
            }
        },
        study_id: {
            type: DataTypes.INTEGER,
            unique: true,
            reference:{
                model: "study",
                key: "id"
            }
        }
    },{
        tableName: 'studyGroup',
        timestamps: false
    })
}
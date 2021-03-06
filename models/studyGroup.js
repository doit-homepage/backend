const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studyGroup', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.STRING(64),
            reference:{
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
        tableName: 'studyGroup',
        timestamps: false
    })
}
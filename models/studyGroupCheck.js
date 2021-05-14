const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studyGroupCheck', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        study_date: {
            type: DataTypes.DATE
        },
        check: {
            type: DataTypes.BOOLEAN
        },
        studyGroup_id: {
            type: DataTypes.INTEGER,
            references:{
                model: "studyGroup",
                key: "id"
            }
        }
    },{
        tableName: 'studyGroupCheck',
        timestamps: false
    })
}
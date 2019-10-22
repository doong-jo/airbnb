import { disallowNull } from "../utils/sequel";

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        disallowNull({
            login_id: {
                type: DataTypes.STRING
            },
            salt: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            birth: {
                type: DataTypes.STRING
            },
            gender: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            favorite: {
                type: DataTypes.STRING
            },
            is_admin: {
                type: DataTypes.TINYINT
            }
        }),
        {
            tableName: "user",
            timestamps: true,
            freezeTableName: true,
            underscored: true
        }
    );

    user.associate = function(models) {
        user.hasMany(models.reservation, {
            foreignKey: "user_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };

    user.insertDataType = "json";
    return user;
};

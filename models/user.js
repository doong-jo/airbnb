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
    // 관계 설정
    user.associate = function(models) {
        // associations
        // foreignKey: 상대방 column 이름
        // sourceKey: 내 column 이름
        // User.hasMany(models.Project, {
        //     foreignKey: "user_id",
        //     sourceKey: "id",
        //     onDelete: "cascade",
        //     onUpdate: "cascade"
        // });
        // User.hasMany(models.Task, {
        //     foreignKey: "user_id",
        //     sourceKey: "id"
        // });
    };

    return user;
};

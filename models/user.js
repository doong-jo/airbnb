module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        {
            login_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birth: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            favorite: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_admin: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                allowNull: false,
                type: "TIMESTAMP",
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            }
        },
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

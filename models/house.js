module.exports = (sequelize, DataTypes) => {
    const house = sequelize.define(
        "house",
        {
            uid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            images: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM([
                    "Private room",
                    "Entire home/apt",
                    "Hotel room",
                    "Shared room"
                ]),
                allowNull: false
            },
            desc: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            capacity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            bedroom: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            bathroom: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            bed: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            review_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "0"
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
            tableName: "house",
            timestamps: true,
            freezeTableName: true
        }
    );
    // 관계 설정
    house.associate = function(models) {
        // associations
        // foreignKey: 상대방 column 이름
        // sourceKey: 내 column 이름
        // house.hasMany(models.Project, {
        //     foreignKey: "house_id",
        //     sourceKey: "id",
        //     onDelete: "cascade",
        //     onUpdate: "cascade"
        // });
        // house.hasMany(models.Task, {
        //     foreignKey: "house_id",
        //     sourceKey: "id"
        // });
    };

    return house;
};

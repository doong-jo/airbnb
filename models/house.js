import { disallowNull } from "../utils/sequel";

module.exports = (sequelize, DataTypes) => {
    const house = sequelize.define(
        "house",
        disallowNull({
            name: {
                type: DataTypes.STRING
            },
            images: {
                type: DataTypes.STRING
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
                type: DataTypes.TEXT
            },
            price: {
                type: DataTypes.INTEGER
            },
            capacity: {
                type: DataTypes.INTEGER
            },
            bedroom: {
                type: DataTypes.INTEGER
            },
            bathroom: {
                type: DataTypes.FLOAT
            },
            bed: {
                type: DataTypes.INTEGER
            },
            review_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            rating: {
                type: DataTypes.STRING,
                defaultValue: "0"
            }
        }),
        {
            tableName: "house",
            timestamps: true,
            freezeTableName: true,
            underscored: true
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

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

    house.associate = function(models) {};

    house.insertDataType = "csv";
    return house;
};

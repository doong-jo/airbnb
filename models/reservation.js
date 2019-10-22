import { disallowNull } from "../utils/sequel";

module.exports = (sequelize, DataTypes) => {
    const reservation = sequelize.define(
        "reservation",
        disallowNull({
            check_in: {
                type: DataTypes.DATE
            },
            check_out: {
                type: DataTypes.DATE
            },
            adult: {
                type: DataTypes.INTEGER
            },
            child: {
                type: DataTypes.INTEGER
            },
            baby: {
                type: DataTypes.INTEGER
            },
            house_id: {
                type: DataTypes.INTEGER
            },
            user_id: {
                type: DataTypes.INTEGER
            }
        }),
        {
            tableName: "reservation",
            timestamps: true,
            freezeTableName: true,
            underscored: true
        }
    );

    reservation.associate = function(models) {};

    reservation.insertDataType = "json";
    return reservation;
};

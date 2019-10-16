import { disallowNull } from "../utils/sequel";
import { user, house } from "../models/db";

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
            adault: {
                type: DataTypes.INTEGER
            },
            children: {
                type: DataTypes.INTEGER
            },
            baby: {
                type: DataTypes.INTEGER
            },
            user_id: {
                type: DataTypes.INTEGER
            },
            house_id: {
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
    // 관계 설정
    reservation.associate = function(models) {
        reservation.belongsTo(models.user, {
            foreignKey: "id",
            sourceKey: "user_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        reservation.belongsTo(models.house, {
            foreignKey: "id",
            sourceKey: "house_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };

    reservation.insertDataType = "json";
    return reservation;
};

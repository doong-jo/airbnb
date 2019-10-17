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
            adault: {
                type: DataTypes.INTEGER
            },
            children: {
                type: DataTypes.INTEGER
            },
            baby: {
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
            foreignKey: "user_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        });
        reservation.belongsTo(models.house, {
            foreignKey: "house_id",
            onDelete: "cascade",
            onUpdate: "cascade"
        });
    };

    reservation.insertDataType = "json";
    return reservation;
};

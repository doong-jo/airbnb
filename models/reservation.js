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
            user_id: {
                type: DataTypes.STRING
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
        // associations
        // foreignKey: 상대방 column 이름
        // sourceKey: 내 column 이름
        // reservation.hasMany(models.Project, {
        //     foreignKey: "reservation_id",
        //     sourceKey: "id",
        //     onDelete: "cascade",
        //     onUpdate: "cascade"
        // });
        // reservation.hasMany(models.Task, {
        //     foreignKey: "reservation_id",
        //     sourceKey: "id"
        // });
    };

    reservation.insertDataType = "json";
    return reservation;
};

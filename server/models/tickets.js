const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('tickets', {
        event_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'events',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        can_show: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        payment_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'payments',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'tickets',
        freezeTableName: true,
        schema: 'public',
        timestamps: false
    });
};

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
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: 'tickets',
        schema: 'public',
        timestamps: false
    });
};

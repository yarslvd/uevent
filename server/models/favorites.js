const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('favorites', {
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
        }
    }, {
        sequelize,
        tableName: 'favorites',
        schema: 'public',
        timestamps: false
    });
};

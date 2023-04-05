const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('subscriptions', {
        organizer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'organizers',
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
        tableName: 'subscriptions',
        schema: 'public',
        timestamps: false
    });
};

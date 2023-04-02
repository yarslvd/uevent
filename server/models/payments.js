const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('payments', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        payer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        order_id: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        signature: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
          type: DataTypes.ENUM('success', 'reverted', 'in progress'),
          allowNull: false
        },
    }, {
        sequelize,
        tableName: 'payments',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "payments_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};

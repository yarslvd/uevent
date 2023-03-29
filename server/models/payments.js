const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('payments', {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        signature: {
            type: DataTypes.TEXT,
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

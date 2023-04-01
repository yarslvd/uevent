const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('promos', {
    event_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    valid_till: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'promos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "promos_pkey",
        unique: true,
        fields: [
          { name: "text" },
        ]
      },
    ]
  });
};

const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('organizers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organizers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'organizers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "organizers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

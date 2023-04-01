const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('events', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "set some default poster bitch"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    iso_currency: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    organizer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organizers',
        key: 'id'
      }
    },
    ticket_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    visability: {
      type: DataTypes.ENUM("private","public"),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'events',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "events_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

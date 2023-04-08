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
      defaultValue: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
      type: DataTypes.STRING(255),
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
    visibility: {
      type: DataTypes.ENUM("private","public"),
      allowNull: false
    },
    spotify_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    format: {
      type: DataTypes.TEXT
    },
    theme: {
      type: DataTypes.TEXT
    },
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

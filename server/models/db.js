const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const { startTokensCleaner } = require('../runners/tokens-cleaner');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect : 'postgres',
  logging: true,
});

let users = require("./users")(sequelize);
let organizers = require("./organizers")(sequelize);
let events = require("./events")(sequelize);
let comments = require("./comments")(sequelize);
let promos = require("./promos")(sequelize);
let tokens = require("./tokens")(sequelize);
let tickets = require("./tickets")(sequelize);
let payments = require("./payments")(sequelize);

promos.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(promos, { as: "promos", foreignKey: "event_id"});
tickets.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(tickets, { as: "tickets", foreignKey: "event_id"});
events.belongsTo(organizers, { as: "organizer", foreignKey: "organizer_id"});
organizers.hasMany(events, { as: "events", foreignKey: "organizer_id"});
organizers.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(organizers, { as: "organizers", foreignKey: "user_id"});
tickets.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(tickets, { as: "tickets", foreignKey: "user_id"});

users.hasMany(payments, { as: "payments", foreignKey: "payer_id"});
payments.belongsTo(users, { as: "user", foreignKey: "payer_id"});

(async () => {await sequelize.sync()
    .then(() => {
        console.log('DB was created');
        startTokensCleaner(tokens);
    })
    .catch((error) => {
        console.log('Some error happened, during creating db: ', error);
    })
  })()

module.exports = { 
  sequelize : sequelize,
  users : users,
  events : events,
  comments : comments,
  promos : promos,
  organizers: organizers,
  tokens: tokens,
  tickets: tickets,
  payments: payments,
};
const Sequelize = require('sequelize');
const { startTokensCleaner } = require('../runners/tokens-cleaner');
const {setDefaultData} = require("../helpers/default-data");

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
let payments = require("./payments")(sequelize);
let tickets = require("./tickets")(sequelize);
let subscriptions = require("./subscriptions")(sequelize);
let favorites = require("./favorites")(sequelize);

favorites.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(favorites, { as: "favorites", foreignKey: "event_id"});
promos.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(promos, { as: "promos", foreignKey: "event_id"});
tickets.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(tickets, { as: "tickets", foreignKey: "event_id"});
events.belongsTo(organizers, { as: "organizer", foreignKey: "organizer_id"});
organizers.hasMany(events, { as: "events", foreignKey: "organizer_id"});
subscriptions.belongsTo(organizers, { as: "organizer", foreignKey: "organizer_id"});
organizers.hasMany(subscriptions, { as: "subscriptions", foreignKey: "organizer_id"});
tickets.belongsTo(payments, { as: "payment", foreignKey: "payment_id"});
payments.hasMany(tickets, { as: "tickets", foreignKey: "payment_id"});
favorites.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(favorites, { as: "favorites", foreignKey: "user_id"});
organizers.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(organizers, { as: "organizers", foreignKey: "user_id"});
payments.belongsTo(users, { as: "payer", foreignKey: {name: "payer_id", allowNull: true}});
users.hasMany(payments, { as: "payments", foreignKey: "payer_id"});
subscriptions.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(subscriptions, { as: "subscriptions", foreignKey: "user_id"});
tickets.belongsTo(users, { as: "user", foreignKey: "user_id"});
users.hasMany(tickets, { as: "tickets", foreignKey: "user_id"});

comments.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
users.hasMany(comments, { as: "comments", foreignKey: "user_id"});

payments.belongsTo(events, {as: 'event', foreignKey: 'event_id'});
events.hasMany(payments, {as: 'payments', foreignKey: 'event_id'});

(async () => {await sequelize.sync()
    .then(() => {
        console.log('DB was created');
        startTokensCleaner(tokens);
        setDefaultData({
            sequelize : sequelize,
            users : users,
            events : events,
            comments : comments,
            promos : promos,
            organizers: organizers,
            tokens: tokens,
            tickets: tickets,
            favorites: favorites,
            subscriptions: subscriptions,
            payments: payments,
        });
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
  favorites: favorites,
  subscriptions: subscriptions,
  payments: payments,
};
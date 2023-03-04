const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect : 'postgres',
  logging: false,
});


let comments = require("./comments")(sequelize);
let users = require("./users")(sequelize);
let events = require("./events")(sequelize);
let promos = require("./promos")(sequelize);
let organizers = require("./organizers")(sequelize);

promos.belongsTo(events, { as: "event", foreignKey: "event_id"});
events.hasMany(promos, { as: "promos", foreignKey: "event_id"});
events.belongsTo(organizers, { as: "organizer", foreignKey: "organizer_id"});
organizers.hasMany(events, { as: "events", foreignKey: "organizer_id"});
organizers.belongsTo(organizers, { as: "user", foreignKey: "user_id"});
organizers.hasMany(organizers, { as: "organizers", foreignKey: "user_id"});

//TODO: make proper sync to check if db exists
// sequelize.sync()
//     .then(() => {
//         console.log('DB was created');
//     })
//     .catch((error) => {
//         console.log('Some error happend, during creating db: ', error);
//     })


module.exports = { 
  sequelize : sequelize,
  users : users,
  events : events,
  comments : comments,
  promos : promos,
  organizers: organizers,
};
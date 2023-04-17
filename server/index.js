require('dotenv').config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const { mkDirByPathSync } = require('./utils/mk-dir');
const { parseWhitelist } = require('./utils/cors');

const whitelist = parseWhitelist(process.env.CORS_ORIGINS);

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log({origin});
      callback(new Error("Not allowed by CORS " + origin))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

// {
//   origin: whitelist,
//   credentials: true,
//   optionsSuccessStatus: 200
//}

mkDirByPathSync("./public/avatars", {isRelativeToScript: true});
mkDirByPathSync("./public/organizers", {isRelativeToScript: true});
mkDirByPathSync("./public/posters", {isRelativeToScript: true});

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());
app.use(bodyParser());

const authRouter = require('./routes/auth-routes');
const organizersRouter = require('./routes/organizers-routes');
const eventsRouter = require('./routes/events-routes');
const commentsRouter = require('./routes/comments-routes');
const promosRouter = require('./routes/promos-routes');
const ticketsRouter = require('./routes/tickets-routes');
const subscriptionsRouter = require('./routes/subscriptions-routes');
const favouritesRouter = require('./routes/favourites-routes');
const paymentsRouter = require('./routes/payments-routes');
const usersRouter = require('./routes/users-routes');

app.use("/api/auth", authRouter);
app.use("/api/organizers", organizersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/promos", promosRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/users", usersRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
});
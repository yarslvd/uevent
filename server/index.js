require('dotenv').config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const { mkDirByPathSync } = require('./utils/mk-dir');
const { parseWhitelist } = require('./utils/cors');

const https = require("https");
const fs = require("fs");

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
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());
app.use(cookieParser({
  sameSite: 'none',
  httpOnly: true,
  secure: false
}));

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
const { AdminJSRouter, admin } = require('./utils/admin-panel');

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
app.use(admin.options.rootPath, AdminJSRouter());
// app.use(bodyParser());

// app.listen(process.env.SERVER_PORT, () => {
    // console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
// });

// Create a NodeJS HTTPS listener on port 4000 that points to the Express app
// Use a callback function to tell when the server is created.
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(process.env.SERVER_PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
  });

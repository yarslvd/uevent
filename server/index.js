require('dotenv').config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

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

app.use("/api/auth", authRouter);
app.use("/api/organizers", organizersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/comments", commentsRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
});
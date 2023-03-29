require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser")

const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());

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
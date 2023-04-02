require('dotenv').config();
const express = require('express');
var cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');

var whitelist = ['http://localhost:3000']

var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
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
const promosRouter = require('./routes/promos-routes');
const { checkPayment } = require('./controllers/events-controller');

app.use("/api/auth", authRouter);
app.use("/api/organizers", organizersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/promos", promosRouter);

app.get("/api/payments/:id", checkPayment);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
});
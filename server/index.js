require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'/')));
app.use(express.json());

const authRouter = require('./routes/auth-routes');

app.use(authRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${process.env.SERVER_PORT}/`);
});
const express = require('express')
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
const authRoute = require('./routes/auth')
dotenv.config();

app.use(express.json());
const db = require('./config/db');

//health api
app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

//auth route
app.use('/',authRoute);

app.listen(port, () => {
    console.log(`App are listing on ${port}`)
  })
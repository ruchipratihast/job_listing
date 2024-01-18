const express = require('express')
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
dotenv.config();

const db = require('./config/db')


//health api
app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

app.listen(port, () => {
    console.log(`App are listing on ${port}`)
  })
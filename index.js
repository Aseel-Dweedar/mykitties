const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});
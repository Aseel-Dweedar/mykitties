const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { createCat, getCats, deleteCat, getOneCat } = require('./controllers/cat.controller');
const tokenModel = require("./models/token.model");
const { createUser, userLogin } = require("./controllers/user.controller");

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// // // // // // // global middleware // // // // // //
app.use(cors());
app.use(express.json());

// // // // // // // mongoose connect // // // // // //
try {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connect to mongo");
} catch (error) {
    console.error(error)
}


// // // // // // // root endpoint // // // // // //
app.get("/", (req, res) => {
    res.send("Hello World")
});

// // // // // // // User endpoint // // // // // //
app.post("/user", createUser);
app.post("/user/login", userLogin);

// // // // // // // Authentication middleware // // // // // //
app.use(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        let bearerToken = authHeader.split(" ")[1];
        const userToken = await tokenModel.findOne({ token: bearerToken });
        if (bearerToken === userToken.token) {
            req.user = userToken.user;
            next();
        }
    } else {
        res.sendStatus(401);
    }
});

// // // // // // // Car endpoint // // // // // //
app.get("/cat", getCats);
app.get("/cat/:id", getOneCat);
app.post("/cat", createCat);
app.delete("/cat/:catId", deleteCat);
// app.put("/cat/:catId", updateCat);


// // // // // // // 404 handler // // // // // //
app.use((req, res, next) => {
    res.status(404).send({
        "status": 404,
        "responseText": "Sorry, Page not found"
    })
})

// // // // // // // 404 handler // // // // // //
app.use((err, req, res, next) => {
    res.status(500).send({
        "status": 500,
        "responseText": "Sorry, something went wrong"
    })
})

// // // // // // // port listen // // // // // //
app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});
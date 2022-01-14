"use strict";

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const tokenModel = mongoose.model("token", tokenSchema);

module.exports = tokenModel;
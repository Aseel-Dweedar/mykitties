"use strict";

const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: String,
    breed: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
});

const catModel = mongoose.model("cat", catSchema);

module.exports = catModel;

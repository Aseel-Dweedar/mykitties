"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.virtual("cats", {
    ref: "cat",
    localField: "_id",
    foreignField: "user",
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
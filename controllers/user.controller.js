"use strict";

const userModel = require("../models/user.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const tokenModel = require("../models/token.model");

// // // // // // // global functions // // // //
async function findByUsername(username) {
    return await userModel.findOne({ username });
}

// // // // // // // CRETE // // // // // // //
const createUser = async (req, res) => {
    try {
        let { username, password, firstName, lastName, phone, email } = req.body;

        let user = await findByUsername(username);

        if (user) {
            res.send("Username already exist");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let newUser = new userModel({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                email,
                cats: [],
            });
            newUser.save();
            res.send("User created successfully !!");
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
};

// // // // // // // Login // // // // // // //
const userLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await findByUsername(username);
        if (!user) return res.send("Cannot find user !");
        if (await bcrypt.compare(password, user.password)) {
            const token = crypto.randomBytes(64).toString("hex");
            tokenModel.findOneAndUpdate({ user }, { token: token }, { new: true }, (err, data) => {
                if (err) {
                    res.send(err);
                } else if (data === null) {
                    let newToken = new tokenModel({
                        token: token,
                        user: user,
                    });
                    newToken.save();
                }
                res.send({ token: token, ...user._doc });
            });
        } else {
            res.send("Incorrect password !!");
        }
    } catch (error) {
        return res.send(error.message);
    }
};

module.exports = { createUser, userLogin };
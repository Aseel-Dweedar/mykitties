'use strict'

const catModel = require('../models/cat.model');

// // // // // // // global function get all user cats // // // // // //
const getUserCats = (res, user) => {
    catModel.find({ user }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send(data);
        }
    }).populate("user");
};

// // // // // // // CRETE // // // // // //
const createCat = async (req, res) => {

    const { name, breed, description } = req.body;
    const user = req.user;

    let newCat = new catModel({ name, breed, description });
    newCat.user = user;

    await newCat.save();
    res.send(newCat);
}

// // // // // // // get all user's cats // // // // // //
const getCats = (req, res) => {
    let user = req.user;
    getUserCats(res, user);
};

// // // // // // // GET One Cat // // // // // //
const getOneCat = (req, res) => {
    const id = req.params.id;
    catModel.findOne({ _id: id }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            res.send(data);
        }
    }).populate("user");
};

// // // // // // // DELETE // // // // // //
const deleteCat = (req, res) => {
    let catId = req.params.catId;
    let user = req.user;
    catModel.deleteOne({ _id: catId }, (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            getUserCats(res, user);
        }
    });
};

module.exports = { createCat, getCats, deleteCat, getOneCat };

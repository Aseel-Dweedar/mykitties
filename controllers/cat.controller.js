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

// // // // // // // get all user's cats // // // // // //
const getCats = (req, res) => {
    let user = req.user;
    getUserCats(res, user);
};


// // // // // // // CRETE // // // // // //
const createCat = async (req, res) => {

    const { name, breed, description } = req.body;
    const user = req.user;

    let newCat = new catModel({ name, breed, description });
    newCat.user = user;

    await newCat.save();

    getUserCats(res, user);
}

// // // // // // // update // // // // // //
const updateCat = (req, res) => {

    let catId = req.params.catId;
    const { name, breed, description } = req.body;
    const user = req.user;

    catModel.findOne({ _id: catId }, async (error, data) => {
        if (error) {
            res.send(error.message);
        } else {
            data.name = name;
            data.breed = breed;
            data.description = description;
            await data.save();
            getUserCats(res, user);
        }
    });
}

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

module.exports = { createCat, getCats, deleteCat, updateCat };

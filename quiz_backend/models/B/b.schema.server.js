module.exports = function () {
    var mongoose = require("mongoose");

    var BSchema  = mongoose.Schema({
        english: String,
        spanish: String
    },{collection: "B"});

    return BSchema;
};

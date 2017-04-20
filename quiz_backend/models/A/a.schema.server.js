module.exports = function () {
    var mongoose = require("mongoose");

    var ASchema  = mongoose.Schema({
        english: String,
        spanish: String
    },{collection: "A"});

    return ASchema;
};

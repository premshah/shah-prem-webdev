module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var ASchema = require("./a.schema.server.js")();
    var AModel = mongoose.model("AModel",ASchema);

    var api = {
        insertData: insertData,
        findAllData: findAllData,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function insertData(data) {
        return AModel.create(data);
    }

    function findAllData() {
        return AModel.find({});
    }
};

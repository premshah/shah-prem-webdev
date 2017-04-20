module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var BSchema = require("./b.schema.server.js")();
    var BModel = mongoose.model("BModel",BSchema);

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
        return BModel.create(data);
    }

    function findAllData() {
        return BModel.find({});
    }
};


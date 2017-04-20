module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var ExamSchema = require("./exam.schema.server.js")();
    var ExamModel = mongoose.model("ExamModel",ExamSchema);

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
        return ExamModel.create(data);
    }

    function findAllData(userId,examId) {
        return ExamModel.find({uid: userId, examid: examId});
    }
};



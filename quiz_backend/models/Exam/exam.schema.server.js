module.exports = function () {
    var mongoose = require("mongoose");
    var ExamSchema  = mongoose.Schema({
        uid: String,
        examid: String,
        question: String,
        correct_ans: String,
        user_ans: String,
    },{collection: "exam"});

    return ExamSchema;
};

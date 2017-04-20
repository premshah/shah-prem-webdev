module.exports = function () {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/webdev-project-quiz';
    if (process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    //mongoose.connect(connectionString);

    var AModel = require("./A/a.model.server")();
    var BModel = require("./B/b.model.server")();
    var ExamModel = require("./Exam/exam.model.server")();

    var model = {
        AModel: AModel,
        BModel: BModel,
        ExamModel: ExamModel
    };

    AModel.setModel(model);
    BModel.setModel(model);
    ExamModel.setModel(model);

    return model;
}


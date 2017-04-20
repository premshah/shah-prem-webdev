module.exports = function (app, model) {
    app.get('/api/user/:userId/exam/:examId', findAllData);
    app.post('/api/exam', insertData);

    function findAllData(req,res) {
        var userId = req.params['userId'];
        var examId = req.params['examId'];
        model.ExamModel.findAllData(userId,examId)
            .then(
                function (datas) {
                    res.send(datas);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function insertData(req,res) {
        var data = req.body;
        model.ExamModel.insertData(data)
            .then(function (data) {
                    res.send(data);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }
}



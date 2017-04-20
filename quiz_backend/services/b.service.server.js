module.exports = function (app, model) {
    app.get('/api/quiz/B', findAllData);
    app.post('/api/quiz/B', insertData);

    function findAllData(req,res) {
        model.BModel.findAllData()
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
        model.BModel.insertData(data)
            .then(function (data) {
                    res.send(data);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }
}


module.exports = function (app, model) {
    app.get('/api/quiz/A', findAllData);
    app.post('/api/quiz/A', insertData);

    function findAllData(req,res) {
        model.AModel.findAllData()
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
        model.AModel.insertData(data)
            .then(function (data) {
                res.send(data);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }
}

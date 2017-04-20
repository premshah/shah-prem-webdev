module.exports = function(app) {
    var model = require("./models/models.server.js")();
    require("./services/a.service.server.js")(app, model);
    require("./services/b.service.server.js")(app, model);
    require("./services/exam.service.sever.js")(app, model);
};
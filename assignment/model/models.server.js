module.exports = function () {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/web-spring-2017';
    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);


    var UserModel = require("./user/user.model.server")();
    var PageModel = require("./page/page.model.server")();
    var WebsiteModel = require("./website/website.model.server")();
    var WidgetModel = require("./widget/widget.model.server")();

    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    UserModel.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

    return model;
}

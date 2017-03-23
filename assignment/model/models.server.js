module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/web-spring-2017');

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

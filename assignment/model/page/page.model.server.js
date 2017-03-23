module.exports = function () {
  var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel,
        findAllWidgetsForPage: findAllWidgetsForPage
    };
    return api;

    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate("widgets").lean().exec();
    }

    function setModel(_model) {
        model = _model;
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }
    
    function deletePage(pageId) {
        return model.PageModel.findPageById(pageId)
            .then(
                function (pg) {
                    return model.WebsiteModel.findWebsiteById(pg._website)
                        .then(
                            function (wb) {
                                index = wb.pages.indexOf(pageId);
                                wb.pages.splice(index,1);
                                wb.save();
                                return PageModel.remove({_id:pageId});
                            },
                            function (error) {
                                return error;
                            }
                        );
                },
                function (error) {
                    return error;
                }
            );
    }

    function updatePage(pageId, page) {
        return PageModel
            .update({
                _id: pageId
            },{
                name: page.name,
                description: page.description
            });
    }


    function findAllPagesForWebsite(websiteId) {
        return model.WebsiteModel.findAllPagesForWebsite(websiteId);
    }
    
    function createPage(websiteId, page) {
        return PageModel
            .create(page)
            .then(
                function (pg) {
                    model
                        .WebsiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function (wbobj) {
                                wbobj.pages.push(pg);
                                wbobj.save();
                                pg._website = wbobj;
                                return pg.save();
                            },
                            function (error) {
                                return error;
                            }
                        );
                },
                function (error) {
                    return error;
                }
            );
    }
};

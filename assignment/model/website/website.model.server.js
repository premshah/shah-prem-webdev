module.exports = function () {
    var model = {};
  var mongoose = require("mongoose");
  var WebsiteSchema = require("./website.schema.server")();
  var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);

  var api= {
      createWebsite: createWebsite,
      createWebsiteForUser: createWebsiteForUser,
      findAllWebsitesForUser: findAllWebsitesForUser,
      findAllPagesForWebsite: findAllPagesForWebsite,
      findWebsiteById: findWebsiteById,
      updateWebsite: updateWebsite,
      deleteWebsite: deleteWebsite,
      setModel: setModel
  };
  return api;

  function findAllPagesForWebsite(websiteId) {
      return WebsiteModel
          .findById(websiteId)
          .populate("pages")
          .exec();
  }

  function setModel(_model) {
      model = _model;
  }

  function createWebsite(website) {
      return WebsiteModel.create(website);
  }
  
  function createWebsiteForUser(userId, website) {
      return WebsiteModel
          .create(website)
          .then(
              function (wb) {
                  model
                      .UserModel
                      .findUserById(userId)
                      .then(
                          function (userobj) {
                              userobj.websites.push(wb);
                              userobj.save();
                              wb._user = userobj;
                              return wb.save();
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
  
  function findAllWebsitesForUser(userId) {
      //console.log("model");
      return model.UserModel.findAllWebsitesForUser(userId);
  }

  function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
  }

  function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },{
                    name: website.name,
                    description: website.description
                }
            )
  }

  function deleteWebsite(websiteId) {
      return model.WebsiteModel.findWebsiteById(websiteId)
          .then(
              function (wb) {
                  return model.UserModel.findUserById(wb._user)
                      .then(
                          function (usr) {
                              index = usr.websites.indexOf(websiteId);
                              usr.websites.splice(index,1);
                              usr.save();
                              return WebsiteModel.remove({_id: websiteId});
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

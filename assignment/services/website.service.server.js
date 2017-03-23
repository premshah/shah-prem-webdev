module.exports = function (app, model) {

  app.post("/api/user/:userId/website",createWebsite);
  app.get("/api/user/:userId/website",findAllWebsitesForUser);
  app.get("/api/website/:websiteId",findWebsiteById);
  app.put("/api/website/:websiteId",updateWebsite);
  app.delete("/api/website/:websiteId",deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

  function createWebsite(req, res) {
      var wb = req.body;
      var userId = req.params['userId'];
      model
          .WebsiteModel
          .createWebsiteForUser(userId,wb).
          then(
              function (website) {
                  res.send(website);
              },
          function (error) {
              res.sendStatus(400).send(error);
          }
      );
      /*wb.developerId = userId;
      wb._id = (new Date()).getTime() + "";
      websites.push(wb);
      //console.log(websites);
      res.json(wb);*/
  }

  function findAllWebsitesForUser(req, res) {
      var userId = req.params['userId'];
      console.log(userId);
      model
          .WebsiteModel
          .findAllWebsitesForUser(userId)
          .then(
              function (user) {
                  //console.log(user);
                   res.send(user);
              },
              function (error) {
                  res.sendStatus(400).send(error);
              }
          );
      /*wb = [];
      for (website in websites){
          if(websites[website].developerId==userId)
          {
              //console.log(websites[website]);
              wb.push(websites[website]);
          }
      }
      if(wb!=[])
      {
          res.json(wb);
      }
      else
      {
          res.sendStatus(404);
      }*/
  }

  function findWebsiteById(req, res) {
      var websiteId = req.params['websiteId'];
      model
          .WebsiteModel
          .findWebsiteById(websiteId)
          .then(
            function (webobj) {
                res.send(webobj);
            },
              function (error) {
                  res.sendStatus(400).send(error);
              }
          );
      /*for (var website in websites){
          if(websites[website]._id==websiteId)
          {
            res.send(websites[website]);
            return;
          }
      }
      res.sendStatus(404).send({});*/
  }

  function updateWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      var website = req.body;
      model
          .WebsiteModel
          .updateWebsite(websiteId,website)
          .then(
              function (status) {
                  res.send(status);
              },
              function (error) {
                  res.sendStatus(400).send(erro);
              }
          );
      /*for (var wbs in websites){
          if(websites[wbs]._id==websiteId)
          {
              console.log("website found");
              var website = req.body;
              websites[wbs].name = website.name;
              websites[wbs].description = website.description;
              res.sendStatus(200);
              return;
          }
      }
      res.sendStatus(404);*/
  }

  function deleteWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      model
          .WebsiteModel
          .deleteWebsite(websiteId)
          .then(
              function (status) {
                  res.sendStatus(status);
              },
              function (error) {
                  res.sendStatus(400).send(error);
              }
          );
      /*for (var wbs in websites) {
          if (websites[wbs]._id == websiteId) {
                websites.splice(wbs,1);
                res.sendStatus(200);
                return;
          }
      }
      res.sendStatus(404);*/
  }

};

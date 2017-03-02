module.exports = function (app) {

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
      wb._id = (new Date()).getTime() + "";
      websites.push(wb);
      res.json(wb);
  }

  function findAllWebsitesForUser(req, res) {
      var userId = req.params['userId'];
      wb = [];
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
      }
  }

  function findWebsiteById(req, res) {
      var websiteId = req.params['websiteId'];
      for (var website in websites){
          if(websites[website]._id==websiteId)
          {
            res.send(websites[website]);
            return;
          }
      }
      res.sendStatus(404).send({});
  }

  function updateWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      for (var wbs in websites){
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
      res.sendStatus(404);
  }

  function deleteWebsite(req, res) {
      var websiteId = req.params['websiteId'];
      for (var wbs in websites) {
          if (websites[wbs]._id == websiteId) {
                websites.splice(wbs,1);
                res.sendStatus(200);
                return;
          }
      }
      res.sendStatus(404);
  }

};

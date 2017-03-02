module.exports = function (app) {

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res) {
        var pg = req.body;
        pg._id = (new Date()).getTime() + "";
        pages.push(pg);
        res.json(pg);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        pg = [];
        for (page in pages){
            if(pages[page].websiteId==websiteId)
            {
                //console.log(pages[page]);
                pg.push(pages[page]);
            }
        }
        if(pg!=[])
        {
            res.json(pg);
        }
        else
        {
            res.sendStatus(404);
        }
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        for (var page in pages){
            if(pages[page]._id==pageId)
            {
                res.send(pages[page]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        for (var wbs in pages){
            if(pages[wbs]._id==pageId)
            {
                console.log("page found");
                var page = req.body;
                pages[wbs].name = page.name;
                pages[wbs].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        for (var wbs in pages) {
            if (pages[wbs]._id == pageId) {
                pages.splice(wbs,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};

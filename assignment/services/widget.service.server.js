module.exports = function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/page/:pageId/widget", updateWidgetList)
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        /*for(var w in widgets)
        {
            if(widgets[w]._id==widgetId)
            {
                widgets[w].url = String(new Date().getTime());
                widgets[w].width = width;
            }
        }*/

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var wgd = {
            _id: widgetId,
            type: "IMAGE",
            url: '/uploads/'+filename,
            width: width
        };

        model.WidgetModel.updateWidget(widgetId,wgd)
            .then(
                function (status) {
                    var callbackUrl = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
                    res.redirect(callbackUrl);
                },
                function (error) {
                    res.sendStatus(400).send(error);

                }
            )
    }


    function updateWidgetList(req, res) {
        var pageId = req.params['pageId'];
        var startIndex = req.query['start'];
        var endIndex = req.query['end'];
        model.WidgetModel.reorderWidget(pageId,startIndex,endIndex)
            .then(
                function (response) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createWidget(req, res) {
        //console.log("start");
        var wgdType = req.body['type'];
        var pageId = req.params['pageId'];
        var wd = {};
        //console.log(wgdType);
        if(wgdType=="HEADER")
        {
            wd = {
                type:wgdType,
                size:"1",
                text:"NEW TEXT"
            }
        }
        else if(wgdType=="HTML")
        {
            wd = {
                type:wgdType,
                text:"<p>NEW TEXT</p>"
            }
        }
        else if(wgdType=="IMAGE")
        {
            wd = {
                type:wgdType,
                width:"100",
                url:"IMAGE URL"
            }
        }
        else if(wgdType=="YOUTUBE")
        {
            wd = {
                type:wgdType,
                width:"100",
                url:"https://www.youtube.com/embed/ja8pA2B0RR4"
            }
        }
        else if(wgdType=="TEXT")
        {
            wd = {
                type:wgdType,
                text: "Text type",
                rows:1,
                formatted: true,
                placeholder: "Add text and also set/unset formatted and rows options"
            }
        }
        else
        {}
        //console.log(wd);
        model
            .WidgetModel
            .createWidget(pageId,wd)
            .then(
                function (widget) {
                    //console.log(widget);
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pageId'];
        model.WidgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (page) {
                    res.send(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*wgd = [];
        for (var w in widgets){
            if(widgets[w].pageId==pageId)
            {
                //console.log(widgets[widget]);
                wgd.push(widgets[w]);
            }
        }
        if(wgd!=[])
        {
            res.json(wgd);
        }
        else
        {
            res.sendStatus(404);
        }*/
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        model.WidgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for (var widget in widgets){
            if(widgets[widget]._id==widgetId)
            {
                res.send(widgets[widget]);
                return;
            }
        }
        res.sendStatus(404).send({});*/
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        //console.log(widget);
        model.WidgetModel.updateWidget(widgetId,widget)
            .then(function (status) {
                //console.log(status);
                res.send(status);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });

        /*for (var wgd in widgets){
            if(widgets[wgd]._id==widgetId)
            {
                console.log("widget found");

                if(widgets[wgd].widgetType=="HEADER")
                {
                    widgets[wgd].size = widget.size;
                    widgets[wgd].text = widget.text;
                }
                else if(widgets[wgd].widgetType=="YOUTUBE")
                {
                    widgets[wgd].width = widget.width;
                    widgets[wgd].url = widget.url;
                }
                else if(widgets[wgd].widgetType=="IMAGE")
                {
                    widgets[wgd].width = widget.width;
                    widgets[wgd].url = widget.url;
                }
                else
                {
                    widgets[wgd].text = widget.text;
                }
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        model.WidgetModel.deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(status);
                },
                function (error) {
                    res.sendStatus(error);
                }
            );
        /*for (var wgd in widgets) {
            if (widgets[wgd]._id == widgetId) {
                widgets.splice(wgd,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

};
module.exports = function (app) {

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

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        for(var w in widgets)
        {
            if(widgets[w]._id==widgetId)
            {
                widgets[w].url = String(new Date().getTime());
                widgets[w].width = width;
            }
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
    }


    function updateWidgetList(req, res) {
        var pageId = req.params['pageId'];
        var startIndex = req.query['initial'];
        var endIndex = req.query['final'];
        var count = -1;
        var prevIndex = -1;
        var currIndex = -1;
        var wgd;
        var stindex;
        var endindex;
        //console.log(startIndex);
        //console.log(endIndex);
        for (var index in widgets){
            if(widgets[index].pageId==pageId)
            {
                count++;
                currIndex = index;
                if(startIndex<endIndex)
                {
                    if(count==startIndex)
                    {
                        stindex = index;
                    }
                    if(prevIndex>-1 && count<(endIndex-startIndex))
                    {
                        widgets[prevIndex] = widgets[currIndex];
                    }
                    if(count==(endIndex-startIndex))
                    {
                        wgd = widgets[stindex];
                        widgets[prevIndex] = widgets[currIndex];
                        widgets[currIndex] = wgd;
                    }
                }
                else
                {
                    if(count==endIndex)
                    {
                        endindex = index;
                    }
                    if(prevIndex==-1)
                    {
                        wgd = widgets[currIndex];
                    }
                    if(prevIndex>-1 && count<(startIndex-endIndex))
                    {
                        var tmp = widgets[currIndex];
                        widgets[currIndex] = wgd;
                        wgd = tmp;
                    }
                    if(count==(startIndex-endIndex))
                    {
                        widgets[endindex] = widgets[index];
                        widgets[currIndex] = wgd;
                    }
                }
                prevIndex = index;
            }
        }
        //console.log(widgets);
    }

    function createWidget(req, res) {
        //console.log("start");
        var wgdType = req.body['type'];
        var pageId = req.params['pageId'];
        //console.log(wgdType);
        if(wgdType=="HEADER")
        {
            var wd = {
                _id:String(new Date().getTime()),
                widgetType:wgdType,
                pageId:pageId,
                size:"TEXT SIZE",
                text:"NEW TEXT"
            }
            widgets.push(wd);
            res.send(wd._id);
        }
        else if(wgdType=="HTML")
        {
            var wd = {
                _id:String(new Date().getTime()),
                widgetType:wgdType,
                pageId:pageId,
                text:"<p>NEW TEXT</p>"
            }
            widgets.push(wd);
            res.send(wd._id);
        }
        else if(wgdType=="IMAGE")
        {
            var wd = {
                _id:String(new Date().getTime()),
                widgetType:wgdType,
                pageId:pageId,
                width:"WIDTH OF IMAGE(IN %)",
                url:"IMAGE URL"
            }
            widgets.push(wd);
            res.send(wd._id);
        }
        else if(wgdType=="YOUTUBE")
        {
            var wd = {
                _id:String(new Date().getTime()),
                widgetType:wgdType,
                pageId:pageId,
                width:"WIDTH OF FRAME",
                url:"YOUTUBE URL"
            }
            widgets.push(wd);
            res.send(wd._id);
        }
        else
        {

        }
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pageId'];
        wgd = [];
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
        }
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        for (var widget in widgets){
            if(widgets[widget]._id==widgetId)
            {
                res.send(widgets[widget]);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (var wgd in widgets){
            if(widgets[wgd]._id==widgetId)
            {
                console.log("widget found");
                var widget = req.body;
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
        res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for (var wgd in widgets) {
            if (widgets[wgd]._id == widgetId) {
                widgets.splice(wgd,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};
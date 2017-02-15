(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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

        var api = {
            "createWidget"   : createWidget,
            "findWidgetById" : findWidgetById,
            "findWidgetByPageId" : findWidgetsByPageId,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return api;

        function createWidget(pageId, wgdType){
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
                return wd._id;
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
                return wd._id;
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
                return wd._id;
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
                return wd._id;
            }
            else
            {

            }
        }
        function findWidgetsByPageId(pageId){
            wd = []
            for (widget in widgets){
                if(widgets[widget].pageId==pageId)
                {
                    //console.log(websites[website]);
                    wd.push(widgets[widget]);
                }
            }
            return wd;
        }
        function findWidgetById(widgetId){
            var index;
            for (widget in widgets){
                if(widgets[widget]._id==widgetId)
                {
                    index = widget;
                }
            }
            return widgets[index];
        }
        function updateWidget(widgetId, widget){
            var index;
            console.log(widgetId);
            for (wd in widgets){
                if(widgets[wd]._id==widgetId)
                {
                    index = wd;
                }
            }
            console.log(widgets[index]);
            if(widgets[index].widgetType=="HEADER")
            {
                widgets[index].size = widget.size;
                widgets[index].text = widget.text;
            }
            else if(widgets[index].widgetType=="YOUTUBE")
            {
                widgets[index].width = widget.width;
                widgets[index].url = widget.url;
            }
            else if(widgets[index].widgetType=="IMAGE")
            {
                widgets[index].width = widget.width;
                widgets[index].url = widget.url;
            }
            else
            {
                widgets[index].text = widget.text;
            }

        }
        function deleteWidget(widgetId){
            var index;
            for (widget in widgets){
                if(widgets[widget]._id==widgetId)
                {
                    index = widget;
                }
            }
            console.log(index);
            widgets.splice(index,1);
        }

    }

}) ();

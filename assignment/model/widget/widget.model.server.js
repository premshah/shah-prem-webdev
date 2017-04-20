module.exports = function () {
  var model = {}
  var mongoose = require("mongoose");
  var WidgetSchema = require("./widget.schema.server")();
  var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

  var api = {
      createWidget: createWidget,
      findAllWidgetsForPage: findAllWidgetsForPage,
      findWidgetById: findWidgetById,
      updateWidget: updateWidget,
      deleteWidget: deleteWidget,
      reorderWidget: reorderWidget,
      setModel: setModel
  };
  
  return api;

    function setModel(_model) {
        model = _model;
    }
  
  function createWidget(pageId, widget) {
      return WidgetModel
         .create(widget)
         .then(
             function (widgetobj) {
                 return model
                     .PageModel
                     .findPageById(pageId)
                     .then(
                         function (pageobj) {
                             pageobj.widgets.push(widgetobj);
                             pageobj.save();
                             widgetobj._page = pageobj;
                             return widgetobj.save();
                             //return widgetobj.lean();
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
  
  function findAllWidgetsForPage(pageId) {
      return model.PageModel.findAllWidgetsForPage(pageId);
  }
  
  function findWidgetById(widgetId) {
      return WidgetModel.findById(widgetId);
  }

  function updateWidget(widgetId, widget) {
        //console.log("a");
      if (widget.type == "HEADER") {
          //console.log("b");
          return WidgetModel
              .update({
                      _id: widgetId
                  },
                  {
                        name: widget.name,
                        size :widget.size,
                        text: widget.text
                  });
      }
      else if (widget.type == "YOUTUBE") {
          return WidgetModel
              .update({
                      _id: widgetId
                  },
                  {
                      width: widget.width,
                      url: widget.url
                  });
      }
      else if (widget.type == "IMAGE") {
          return WidgetModel
              .update({
                      _id: widgetId
                  },
                  {
                      width: widget.width,
                      url: widget.url
                  });
      }
      else if (widget.type == "TEXT") {
          return WidgetModel
              .update({
                      _id: widgetId
                  },
                  {
                      text: widget.text,
                      placeholder: widget.placeholder,
                      rows: widget.rows,
                      formatted: widget.formatted
                  });
      }
      else {
          return WidgetModel
              .update({
                      _id: widgetId
                  },
                  {
                      text: widget.text
                  });
      }
  }
  
  function deleteWidget(widgetId) {
       return model.WidgetModel.findWidgetById(widgetId).
            then(
                function (wgd) {
                    return model.PageModel.findPageById(wgd._page)
                        .then(function (pg) {
                            index = pg.widgets.indexOf(widgetId);
                            pg.widgets.splice(index,1)
                            pg.save();
                            return WidgetModel.remove({_id:widgetId});
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
  
  function reorderWidget(pageId, start, end) {
      return model.PageModel.findPageById(pageId)
          .then(
              function (pg) {
                  console.log(pg.widgets);
                  pg.widgets.splice(end,0,pg.widgets.splice(start,1)[0]);
                  pg.save();
                  console.log(pg.widgets);
              },
              function (error) {
                  return error;
              }
          );
  }
};
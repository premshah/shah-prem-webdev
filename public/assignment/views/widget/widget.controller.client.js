(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.goback = goback
        vm.gotoaddwidget = gotoaddwidget;
        vm.gotoeditwidget = gotoeditwidget;
        vm.profile = profile;
        vm.doYouTrustUrl = doYouTrustUrl;
        vm.getTrustedHtml = getTrustedHtml;

        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        vm.pgId = pageId;

        function init() {
            var promise = WidgetService.findWidgetByPageId(pageId);

            promise.success(function (page) {
                vm.widgets = page.widgets;
            })
        }
        init();
        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }
        function goback() {
            $location.url("/user/" + userId +"/website/" + websiteId +"/page");
        }
        function gotoaddwidget() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/new");
        }
        function gotoeditwidget(id) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + id);
        }
        function profile() {
            $location.url("/user/" + userId);
        }
    }
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams['pid'];
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.goback = goback;
        vm.profile = profile;
        vm.addwidget = addwidget;

        vm.header = "HEADER";
        vm.html = "HTML";
        vm.youtube = "YOUTUBE";
        vm.image = "IMAGE";
        vm.text = "TEXT";

        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function addwidget(wgdType) {
            var promise = WidgetService.createWidget(pageId,wgdType);

            promise.success(function (response) {
                //console.log(response);
                var wgdId = response._id;
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + wgdId);
            });

        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams['wgid'];
        var pageId = $routeParams['pid'];
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        vm.wbId = $routeParams['wid'];
        vm.pgId = $routeParams['pid'];
        vm.usrId = $routeParams['uid'];

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deletewidget = deletewidget;
        vm.goback = goback;
        vm.profile = profile;
        vm.updatewidget = updatewidget;
        vm.gotoflicker = gotoflicker;

        function gotoflicker() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+ widgetId +"/flickr");
        }
        
        function init() {
            var promise = WidgetService.findWidgetById(widgetId);

            promise.success(function (response) {
                vm.widget = response;
                //console.log(vm.widget);
            });

        }
        init();
        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function deletewidget() {
            //console.log(widgetId);
            var promise = WidgetService.deleteWidget(widgetId);

            promise.success(function (response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            })

        }
        function updatewidget() {
            var promise = WidgetService.updateWidget(widgetId,vm.widget);

            promise.success(function (response) {
                //console.log(response);
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            })

        }
        function getEditorTemplateUrl(type) {
            //console.log(type);
            return 'views/widget/widget-'+type+'.view.client.html';
        }
    }
}) ();
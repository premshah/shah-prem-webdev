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

        function init() {
            vm.widgets = WidgetService.findWidgetByPageId(pageId);
            console.log(vm.widgets);
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
            var t1 = html.split('>');
            var txt = t1[1].split('<');
            return $sce.trustAsHtml(txt[0]);
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

        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function addwidget(wgdType) {
            console.log(wgdType);
            var wgdId = WidgetService.createWidget(pageId,wgdType);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + wgdId);
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        var widgetId = $routeParams['wgid'];
        var pageId = $routeParams['pid'];
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deletewidget = deletewidget;
        vm.goback = goback;
        vm.profile = profile;
        vm.updatewidget = updatewidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(widgetId);
            //console.log(vm.widget);
        }
        init();
        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function deletewidget() {
            console.log(widgetId);
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function updatewidget() {
            WidgetService.updateWidget(widgetId,vm.widget);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function getEditorTemplateUrl(type) {
            return 'views/widget/widget-'+type+'.view.client.html';
        }
    }
}) ();

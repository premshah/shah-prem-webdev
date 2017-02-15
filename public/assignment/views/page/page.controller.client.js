(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];
        vm.goback = goback;
        vm.newpage = newpage;
        vm.pagewidget = pagewidget;
        vm.editpage = editpage;
        vm.profile = profile;

        function goback(){
            $location.url("/user/" + userId + "/website");
        }
        function newpage() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/new");
        }
        function pagewidget(pageid) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageid + "/widget");
        }
        function editpage(pageid) {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageid);
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function init() {
            vm.pages = PageService.findPagesByWebsiteId(websiteId);
        }
        init();
    }
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];
        vm.goback = goback;
        vm.pagelist = pagelist;
        vm.profile = profile;
        
        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function pagelist() {
            PageService.createPage(websiteId,vm.page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
    }
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var pageId = $routeParams['pid'];
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];
        vm.goback = goback;
        vm.pagelist = pagelist;
        vm.profile = profile;
        vm.updatepage = updatepage;
        vm.deletepage = deletepage;

        function goback(){
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function pagelist() {
            PageService.createPage(websiteId,vm.page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function updatepage() {
            PageService.updatePage(pageId,vm.page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function deletepage() {
            PageService.deletePage(pageId);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
        }
        function init()
        {
            vm.page = PageService.findPageById(pageId);
        }
        init();
    }
}) ();

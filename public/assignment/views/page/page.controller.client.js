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
            var promise = PageService.findPagesByWebsiteId(websiteId);

            promise.success(function (website) {
                vm.pages = website.pages;
            });
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
            var promise = PageService.createPage(websiteId,vm.page);

            promise.success(function (response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
            })

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
            var promise = PageService.createPage(websiteId,vm.page);

            promise.success(function (response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
            });

        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function updatepage() {
            var promise = PageService.updatePage(pageId,vm.page);

            promise.success(function (response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
            });

        }
        function deletepage() {
            var promise = PageService.deletePage(pageId);

            promise.success(function (response) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/");
            });

        }
        function init()
        {
            var promise = PageService.findPageById(pageId);

            promise.success(function (response) {
                vm.page = response;
            })
        }
        init();
    }
}) ();

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.goback = goback;
        vm.newwebsite = newwebsite;
        vm.websitepage = websitepage;
        vm.editwebsite = editwebsite;
        vm.profile = profile;

        function goback()
        {
            $location.url("/user/" + userId);
        }
        function newwebsite(){
            $location.url("/user/" + userId + "/website/new");
        }
        function websitepage(webId)
        {
            $location.url("/user/" + userId + "/website/" + webId + "/page");
        }
        function editwebsite(wbId) {
            //console.log(wbId)
            $location.url("/user/" + userId + "/website/" + wbId);
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            //console.log(vm.websites);
        }
        init();
    }
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.goback = goback;
        vm.newwebsite = newwebsite;
        vm.websitepage = websitepage;
        vm.editwebsite = editwebsite;
        vm.addwebsite = addwebsite;
        vm.profile = profile;

        function goback()
        {
            $location.url("/user/" + userId + "/website");
        }
        function newwebsite(){
            $location.url("/user/" + userId + "/website/new");
        }
        function websitepage(webId)
        {
            $location.url("/user/" + userId + "/website/" + webId + "/page");
        }
        function editwebsite(webId) {
            $location.url("/user/" + userId + "/website/" + webId);
        }
        function addwebsite() {
            WebsiteService.createWebsite(userId,vm.website);
            $location.url("/user/" + userId + "/website");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            //console.log(vm.websites);
        }
        init();
    }
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var userId = $routeParams['uid'];

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.goback = goback;
        vm.newwebsite = newwebsite;
        vm.websitepage = websitepage;
        vm.editwebsite = editwebsite;
        vm.websitelist = websitelist;
        vm.prof = prof;

        function goback()
        {
            $location.url("/user/" + userId +"/website");
        }
        function newwebsite(){
            $location.url("/user/" + userId + "/website/new");
        }
        function websitepage(webId)
        {
            $location.url("/user/" + userId + "/website/" + webId + "/page");
        }
        function editwebsite(wbId) {
            $location.url("/user/" + userId + "/website/" + wbId);
        }
        function websitelist() {
            //WebsiteService.createWebsite(userId,vm.website);
            $location.url("/user/" + userId + "/website");
        }
        function prof() {
            $location.url("/user/" + userId);
        }
        function init()
        {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
            //console.log(vm.website);
        }
        init();
        function updateWebsite() {
            console.log(websiteId);
            WebsiteService.updateWebsite(websiteId, vm.website);
            $location.url("/user/" + userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/" + userId + "/website");
        }

    }
}) ();

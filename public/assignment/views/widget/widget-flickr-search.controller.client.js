(function() {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)
    
    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {

        var widgetId = $routeParams['wgid'];
        var pageId = $routeParams['pid'];
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.goback = goback;
        vm.profile = profile;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    //console.log(response);
                    data = response.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function goback() {
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
        }
        function profile() {
            $location.url("/user/" + userId);
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var wgd = {};
            wgd = {
                type: "IMAGE",
                url: url,
                width: 100
            };
            var promise = WidgetService.updateWidget(widgetId,wgd);

            promise.success(function (response) {
                //console.log(response);
                $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            });

        }
    }
}) ();

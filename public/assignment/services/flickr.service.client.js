(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    function FlickrService($http) {
        var key = "741da8ea0ed6b1e07fbf66fc30b9f6c4";
        var secret = "1a9dc7097c4870cf";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
}) ();

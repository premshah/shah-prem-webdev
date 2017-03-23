(function() {
    angular
        .module("SocialNetworkSharing")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "social-network-sharing.html",
                controller: "SocialNetworkSharingController",
                controllerAs: "model"
            })
            .when("/facebook", {
                templateUrl: "facebook-sharing.html",
                controller: "FacebookSharingController",
                controllerAs: "model"
            })
            .when("/linkedin", {
                templateUrl: "linkedin-sharing.html",
                controller: "LinkedInSharingController",
                controllerAs: "model"
            })
            .when("/twitter", {
                templateUrl: "twitter-sharing.html",
                controller: "TwitterSharingController",
                controllerAs: "model"
            })
    }
})();

(function() {
    angular
        .module("BlinkApp")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/", {
                templateUrl: "views/blink.view.client.html",
                controller: "BlinkController",
                controllerAs: "model"
            })
    }
})();

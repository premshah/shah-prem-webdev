(function() {
    angular
        .module("SocialNetworkSharing")
        .factory("SharingService", SharingService);

    function SharingService($http) {
        var api = {
            "shareLinkedIn"   : shareLinkedIn,
            "shareFacebook" : shareFacebook,
            //"shareTwitter" : shareTwitter
        };
        return api;

        function shareFacebook(message) {
            FB.api('/me/feed', 'post', {message: message}, function(response) {
            });
        }

        function shareLinkedIn(message) {
            // Build the JSON payload containing the content to be shared
            var payload = {
                "comment": message,
                "visibility": {
                    "code": "connections-only"
                }
            };

            IN.API.Raw("/people/~/shares?format=json")
                .method("POST")
                .body(JSON.stringify(payload))
                .result(onSuccess)
                .error(onError);
        }

        // Handle the successful return from the API call
        function onSuccess(data) {
            console.log(data);
        }

        // Handle an error response from the API call
        function onError(error) {
            console.log(error);
        }
    }
})();

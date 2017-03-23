(function() {
    angular
        .module("SocialNetworkSharing")
        .controller("SocialNetworkSharingController", SocialNetworkSharingController)
        .controller("FacebookSharingController", FacebookSharingController)
        .controller("LinkedInSharingController", LinkedInSharingController)
        .controller("TwitterSharingController", TwitterSharingController)

    function SocialNetworkSharingController($location) {
        var vm = this;
        vm.facebook = facebook;
        vm.linkedin = linkedin;
        vm.twitter = twitter;

        function facebook() {
            $location.url("/facebook");
        }

        function linkedin() {
            $location.url("/linkedin");
        }

        function twitter() {
            $location.url("/twitter");
        }
    }

    function FacebookSharingController($location, SharingService) {

        var vm = this;
        vm.shareFacebook = shareFacebook;
        vm.login = login;
        vm.getInfo = getInfo;
        vm.logout = logout;

        function login() {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    document.getElementById('status').innerHTML = 'We are connected.';
                } else if (response.status === 'not_authorized') {
                    document.getElementById('status').innerHTML = 'We are not logged in.'
                } else {
                    document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
                }
            }, {scope: 'publish_actions'});
        }
        // getting basic user info
        function getInfo() {
            FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
                document.getElementById('status').innerHTML = response.id;
            });
        }
        // posting on user timeline

        function shareFacebook() {
           var id = SharingService.shareFacebook("My first message .....");
            document.getElementById('status').innerHTML = "Messgae posted on Facebook";
        }

        function logout() {
            FB.logout(function(response) {
                // Person is now logged out
                document.getElementById('status').innerHTML = "User is logout";
            });
        }
    }

    function LinkedInSharingController($location, SharingService) {
        var vm = this;
        vm.shareLinkedIn = shareLinkedIn;

        function shareLinkedIn() {
            var id = SharingService.shareLinkedIn("Temp post for checking usage of LinkedIn Javascript sdk");
            document.getElementById('status').innerHTML = "Messgae posted on LinkedIn";
        }
    }

    function TwitterSharingController() {

    }
}) ();


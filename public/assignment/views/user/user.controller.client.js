(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function LoginController($location, UserService, $rootScope, $scope) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.fbclick = fbclick;

        function fbclick() {
            var promise =  UserService.createFBUser();

            promise.success(function (user) {
                    $rootScope.currentUser = user;
                    $location.url("/user/" + user._id);
            });
        }

        function register() {
            $location.url("/register");
        }
        function login(user) {

            console.log("user");
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    });



            /*var promise = UserService.findUserByCredentials(user.username, user.password);

            promise.success(function (user) {
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            });*/
        }

    }
    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.registerUser = registerUser;
        vm.cancel = cancel;

        function registerUser(user){
           var promise =  UserService.createUser(user);

           promise.success(function (user) {
               var prm = UserService.updateUserFacebookId(user);

               prm.success(function (status) {
                   $rootScope.currentUser = user;
                   $location.url("/user/" + user._id);
               })
           });

        }
        function cancel() {
            $location.url("/login");
        }
    }
    function ProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.website = website;
        vm.logout = logout;
        vm.profile = profile;

        function website()
        {
            $location.url("/user/" + userId + "/website");
        }
        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })

        }
        function profile() {
            var promise = UserService.updateUser(userId, vm.user);

            promise.success(function (response) {
                $location.url("/user/" + userId);
            });
        }
        function init() {
            var promise = UserService.findUserById(userId);

            promise.success(function (response) {
                vm.user = response;
            });
        }
        init();
    }
}) ();

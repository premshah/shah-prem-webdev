(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        function register() {
            $location.url("/register");
        }
        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }

    }
    function RegisterController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;
        vm.cancel = cancel;

        function registerUser(user){
           var userID =  UserService.createUser(user);
            $location.url("/user/" + userID);
        }
        function cancel() {
            $location.url("/login");
        }
    }
    function ProfileController($routeParams, $location, UserService) {
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
            $location.url("/login");
        }
        function profile() {
            $location.url("/user/" + userId);
        }
        function init() {
            vm.user = UserService.findUserById(userId);
        }
        init();
    }
}) ();

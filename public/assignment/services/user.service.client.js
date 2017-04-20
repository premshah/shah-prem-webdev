(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder",  email: "alice@gmail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email:"bob@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email:"charly@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email:"jannunzi@gmail.com" }
        ];

        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
            "login": login,
            "logout": logout,
            "updateUserFacebookId": updateUserFacebookId,
            "createFBUser": createFBUser
        };
        return api;

        function createFBUser() {
            return $http.get ('/auth/facebook');
        }

        function updateUserFacebookId(user) {
            return $http.put("/api/user/", user);
        }
        
        function logout(user) {
            return $http.post("/api/logout");
        }
        
        function login(user) {
            return $http.post("/api/login", user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }
    }

})();
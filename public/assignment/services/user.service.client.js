(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
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
            "deleteUser" : deleteUser
        };
        return api;

        var userById;
        var userByUsername;
        var userByCredentials;

        function createUser(user) {
            var usr = {
                _id: String(new Date().getTime()),
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            }

            users.push(usr);
            return usr._id;
        }

        function findUserById(id) {
            for(usr in users) {
                if (users[usr]._id == id) {
                    var index = usr;
                }
            }

            userById = users[index];
            return userById;
        }

        function findUserByUsername(username) {
            for(usr in users){
                if(users[usr].username==username)
                {
                    var index = usr;
                }
            }

            userByUsername = users[index];
        }

        function findUserByCredentials(username, password) {
            for(usr in users){
                if(users[usr].username==username && users[usr].password==password)
                {
                    var index = usr;
                }
            }

            userByCredentials = users[index];
            return userByCredentials;
        }

        function updateUser(userId, user) {
            for(usr in users){
                if(users[usr]._id==userId)
                {
                    var index = usr;
                }
            }

            users[index]._id = user._id;
            users[index].username = user.username;
            users[index].password = user.password;
            users[index].firstName = user.firstName;
            users[index].lastName = user.lastName;
        }

        function deleteUser(userId) {
            for(usr in users){
                if(users[usr]._id==userId)
                {
                    var index = usr;
                }
            }
            users.splice(index, 1);
        }
    }

})();
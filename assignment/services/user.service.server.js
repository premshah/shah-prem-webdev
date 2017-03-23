module.exports = function (app, model) {

    app.get("/api/user", findUser);
    //app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.get("/api",allUsers);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function allUsers(req,res) {
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .UserModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function createUser(req, res) {
        var newUser = req.body;
        //newUser._id = (new Date()).getTime() + "";
        //users.push(newUser);
        model
            .UserModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.send(user._id);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        //res.json(newUser._id);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model
            .UserModel
            .updateUser(userId,newUser)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*console.log(userId);
        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                console.log('found user');
                console.log(user);
                console.log('new user');
                var newUser = req.body;
                console.log(newUser);
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model
            .UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user)
                    {
                        res.send(user);
                    }
                    else
                    {
                        res.send(0);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                res.send(user);
                return;
            }
        }
        res.sendStatus(404).send({});*/
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model
            .UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(404).send('User not found for username: ' + username);
                }
            );
        /*var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }*/
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];

        model
            .UserModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
                }
            );
        /*var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
        }*/
    }

};

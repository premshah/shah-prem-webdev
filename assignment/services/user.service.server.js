module.exports = function (app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post('/api/login', passport.authenticate('local'), login);
    app.get("/api/user", findUser);
    //app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/", updateUserFacebookId);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.get("/api",allUsers);
    app.post('/api/logout', logout);
    app.get ('/api/loggedin', loggedin);

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '#/login'
        }),
        function(req,res) {
            console.log("callback");
            res.redirect("/assignment/index.html#/user/" + req.user._id);
        }
    );

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function facebookStrategy(token, refreshToken, profile, done) {

        process.nextTick(function () {
            model.UserModel
                .findUserByFacebookId(profile.id)
                .then(function (user) {
                    //console.log(user);
                    if(user ) {
                        console.log(111);
                        done(null, user);
                    } else {
                        //console.log(profile);
                        var user = {
                            username: profile.displayName,
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            //email:     profile.emails[0].value,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.UserModel.createUser(user)
                            .then(function (user) {
                                done(null, user);
                            }, function (err) {
                                console.log(err);
                                done(err, null);
                            });
                    }
                }, function (err) {
                    console.log(err);
                    done(err, null);
                });
        });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function localStrategy(username, password, done) {
        model.UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(bcrypt.compareSync(password, user.password)) {
                        console.log("password");
                        return done(null, user);
                    } else {
                        console.log("error");
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    console.log(err);
                    done(err, null);
                }
            );
    }

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
        console.log(newUser.password);
        newUser.password = bcrypt.hashSync(newUser.password);
        model
            .UserModel
            .createUser(newUser)
            .then(
                function (user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        //res.json(newUser._id);
    }

    function updateUserFacebookId(req, res) {
        var newUser = req.body;
        var userId = newUser._id;
        var fb = {
            id: userId
        };
        model
            .UserModel
            .updateUserFacebookId(userId,fb)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
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

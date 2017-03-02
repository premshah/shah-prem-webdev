module.exports = function(app) {

    /*var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get("/api/user?username=username&password=password", findUserByCredentials);*/

    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    /*function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        console.log(username);
        var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        console.log(user);
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
        }
    }*/
};
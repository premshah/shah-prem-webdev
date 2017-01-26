/**
 * Created by prem on 1/23/17.
 */
module.exports = function (app) {
    app.get('/lectures/todo', getAllTodos);
    app.get('/lectures/todo/:title/:note', createTodo);
    app.get('/lectures/todo/delete/:title/:note', deleteTodo);

    var todos=[
        {'title' : 'Interview Bit', 'note' : 'Do Graphs'},
        {'title' : 'Cook Dinner', 'note' : 'For 2 people'},
    ];

    function getAllTodos(req, res) {
        res.send(todos);
    }

    function createTodo(req,res)
    {
        var newTodo = {
            title: req.params.title,
            note: req.params.note
        }
        todos.push(newTodo);

        res.send(todos);
    }

    function deleteTodo(req,res) {

        var newTodo = {
            title: req.params.title,
            note: req.params.note
        };

        console.log(newTodo);

        var index = todos.indexOf(newTodo);
        todos.splice(index, 1);

        res.send(todos);
    }
}
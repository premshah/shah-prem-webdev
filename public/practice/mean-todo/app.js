/**
 * Created by prem on 1/20/17.
 */
angular
    .module("TodoApp", [])
    .controller("TodoController", TodoController);

function  TodoController($scope, $http) {
    $scope.todos=[];

    $http.get('/lectures/todo').success(function (res) {
        $scope.todos = res;
    })

    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.selectTodo = selectTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1;

    function updateTodo(todo) {
        $scope.todos[$scope.selectedIndex].title = todo.title;
        $scope.todos[$scope.selectedIndex].note = todo.note;
        $scope.todo = {};
    }

    function  createTodo(todo) {

        $http.get('/lectures/todo/' + todo.title + '/' + todo.note).success(function (res)
        {
            $scope.todos = res;
        });

        /*var newTodo = {
            title: todo.title,
            note: todo.note
        }
        $scope.todos.push(newTodo);*/
    };

    function  deleteTodo(todo) {

        $http.get('lectures/todo/delete/' + todo.title + '/' + todo.note).success(function (res)
        {
            $scope.todos = res;
        });

        /*var index = $scope.todos.indexOf(todo);
        $scope.todos.splice(index, 1);*/
    }

    function  selectTodo(todo) {
        $scope.selectedIndex = $scope.todos.indexOf(todo);
        $scope.todo = {}
        $scope.todo.title = todo.title;
        $scope.todo.note = todo.note;
    }
}

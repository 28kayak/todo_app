/**
 * Created by kaya on 6/13/2017.
 */
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http){
    $scope.formData = {};
    //when landing on the page, get all todo list and show them
    $http.get('/api/todos')
         .success(function(data){
        $scope.todos = data;
        console.log(data); })
        .error(function (data) {
            console.log("Error: " + data);
        });
    //when submitting the add form, send the text to the node API(so, it is used post method)
    $http.port('/api/todos', $scope.formData)
        .success(function (data) {
            $scope.todos = data;
        })
}
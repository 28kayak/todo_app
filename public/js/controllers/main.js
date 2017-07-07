/**
 * Created by kaya on 7/6/2017.
 */
angular.module('todoController', [])
    .controller('mainController', function ($scope, $http, Todos) {

        $scope.formData = {};
        //GET method =============================================================================
        //when landing on the page, get all to-do list and show them
        //use the servcice to get all to-do items
        Todos.get().success(function (data) {
           $scope.todos = data;
        });
        //Create =================================================================================
        //when submitting the add form, send the text to the node API(so, it is used post method)
        $scope.createTodo = function() {
            //form validation: not let use add empty to-do item
            if(! $.isEmptyObject($scope.formData))
            {
                //call create function from service
                Todos.create($scope.formData).success(function (data) {
                    $scope.formData = {};// create the form so our user is ready to enter another
                    $scope.todos = data;
                });//end of success
            }
            else
            {
                console.log("==== Item is empty =====");
            }

        };//end of create TO-DO
        //delete a to-do ================================================================================
        $scope.deleteTodo = function(id) {
            //if successful creation, call get function to get all the new todos
            Todos.delete(id).success(function (data) {
              $scope.todos = data;
            });

        };//end of delete todo

    });
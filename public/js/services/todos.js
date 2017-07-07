/**
 * Created by kaya on 7/6/2017.
 */
/**
 * to-do service is meant to interact with out Node API.
 * --> which means, have all functionalities, get, create and delete a to-do inside of the service
 * this ensure we can test this code separate of our overall application
 */
angular.module('todoService', [])
    .factory('Todos', function ($http) {
        return{
            get: function () {
                return $http.get('/api/todos');
            },
            create: function (todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete: function (id) {
                return $http.delete('api/todos/'+ id);
            }
        }
})// end of factory

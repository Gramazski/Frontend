/**
 * Created by gs on 05.03.2017.
 */
var crapsApp = angular.module('crapsApp');
crapsApp.controller('loginController', ['$scope', '$rootScope', '$location', 'loginService', control]);

function control($scope, $rootScope, $location, loginService) {
    $scope.login = function () {
        var user = {};
        user.username = $scope.username;
        user.password = $scope.password;
        var promiseObj=loginService.checkLogin(user);
        promiseObj.then(function(value) {
            if (value === null){

            }
            else {
                $rootScope.loggedInUser = true;
                $rootScope.user = value;
                $location.path("#/");
            }
        });
    };
}
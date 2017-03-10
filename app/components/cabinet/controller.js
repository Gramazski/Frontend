/**
 * Created by gs on 10.03.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("cabinetController",['$scope', '$location', 'userService', control]);

function control($scope, $location, userService) {
    var promiseObj=userService.getInfo();
    promiseObj.then(function(value) {
        $scope.userInfo=value;
    });
}
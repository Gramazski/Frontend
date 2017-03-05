/**
 * Created by gs on 28.02.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("resultController",['$scope', '$location', control]);

function control($scope, $location) {
    $scope.parseXML = function (parserName) {
        var promiseObj=translateService.getTranslate(path, lang);
        promiseObj.then(function(value) {
            $scope.parser=value;
            $location.path('#/result');
        });
    }
}
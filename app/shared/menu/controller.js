/**
 * Created by gs on 28.02.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("mainController",['$scope', '$location', '$rootScope','translateService', control]);

function control($scope, $location, $rootScope, translateService) {
    var promiseObj=translateService.getTranslate('lang_en.json');
    promiseObj.then(function(value) {
        $rootScope.translateModel=value;
    });

    $scope.translate = function (path, lang) {
        var promiseObj=translateService.getTranslate(path, lang);
        promiseObj.then(function(value) {
            $rootScope.translateModel=value;
        });
    };

    $scope.changePage = function () {
        $location.path("result");
    };
}
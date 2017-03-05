/**
 * Created by gs on 28.02.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("homeController",['$scope', '$location', control]);

function control($scope, $location) {
    $scope.parseXML = function (parserName) {
        $location.path('#/result');
        /*var promiseObj=xmlParsingService.getParse(parserName);
        promiseObj.then(function(value) {
            $scope.parser=value;
        });*/
    };

    /*var promiseObj=translateService.getTranslate('trans1.json', 'en');
    promiseObj.then(function(value) {
        $scope.translateModel=value;
    });

    $scope.translate = function (path, lang) {
        var promiseObj=translateService.getTranslate(path, lang);
        promiseObj.then(function(value) {
            $scope.translateModel=value;
        });
    }*/
}
/**
 * Created by gs on 08.04.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("gameController",['$scope', control]);

function control($scope) {
    $scope.betsPosSt = [
        {
            "shape" : "rect",
            "coords" : [0.29, 0.22, 0.37, 0.31],
            "width" : 0.05
        },
        {
            "shape" : "rect",
            "coords" : [0.37, 0.22, 0.44, 0.31],
            "width" : 0.05
        },
        {
            "shape" : "rect",
            "coords" : [0.44, 0.22, 0.51, 0.31],
            "width" : 0.05
        },
        {
            "shape" : "rect",
            "coords" : [0.51, 0.22, 0.59, 0.31],
            "width" : 0.05
        }
    ];

    $scope.betsPos = [];

    for (var i = 0; i < $scope.betsPosSt.length; i++){
        $scope.betsPos[i] = {};
        $scope.betsPos[i].shape = $scope.betsPosSt[i].shape;
        $scope.betsPos[i].coords = [];
        $scope.betsPos[i].width = {};
    }
    commonModule.setAreaWidth($scope.betsPos, $scope.betsPosSt);

    $scope.makeBet = function (bet) {
        var xBet = bet.coords[0] + Math.round((bet.coords[2] - bet.coords[0] - bet.width) / 2) + bet.width;
        var yBet = bet.coords[1] + Math.round((bet.coords[3] - bet.coords[1] - bet.width) / 2);

        commonModule.setBet(xBet, yBet, bet.width);
    };

    $scope.changeAreaCoords = function () {
        commonModule.setAreaWidth($scope.betsPos, $scope.betsPosSt);
    };

}
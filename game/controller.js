/**
 * Created by gs on 08.04.2017.
 */
var crapsApp = angular.module("crapsApp");
crapsApp.controller("gameController",['$scope', control]);

function control($scope) {
    $scope.betsPos = [
        {
            "shape" : "rect",
            "coordsSt" : [0.29, 0.22, 0.37, 0.31],
            "coords" : [],
            "widthSt" : 0.05,
            "width" : 0,
            "type" : "4"
        },
        {
            "shape" : "rect",
            "coordsSt" : [0.37, 0.22, 0.44, 0.31],
            "coords" : [],
            "widthSt" : 0.05,
            "width" : 0,
            "type" : "5"
        },
        {
            "shape" : "rect",
            "coordsSt" : [0.44, 0.22, 0.51, 0.31],
            "coords" : [],
            "widthSt" : 0.05,
            "width" : 0,
            "type" : "six"
        },
        {
            "shape" : "rect",
            "coordsSt" : [0.51, 0.22, 0.59, 0.31],
            "coords" : [],
            "widthSt" : 0.05,
            "width" : 0,
            "type" : "8"
        }
    ];

    $scope.betting = {
        "isMakeBet" : false,
        "isRemoveBet" : false,
        "amount" : 0
    };

    $scope.game = {};
    //for test
    $scope.game.min = 1;
    $scope.game.max = 10;
    $scope.bets = [];
    $scope.history = [];
    $scope.throwing = false;

    commonModule.setAreaWidth($scope.betsPos, $scope.bets);

    $scope.showAnimate = function () {
        $scope.throwing = true;
        commonModule.showAnimate();
    };

    $scope.hideAnimate = function () {
        commonModule.hideAnimate();
        $scope.throwing = false;
        $scope.$apply();
        commonModule.showThrowingResult();
        $scope.onFallenNumber();
    };

    $scope.throwCubes = function () {
        $scope.showAnimate();

        setTimeout($scope.hideAnimate, 2300);
    };

    $scope.setBet = function () {
        $scope.betting.isMakeBet = true;
        $scope.betting.isRemoveBet = false;
    };

    $scope.onFallenNumber = function () {
        addToHistory("Cubes fallen", "number", "win", "win");

    };

    var addToHistory = function (action, descr, result, type) {
        var historyAction = {};
        historyAction.action = action;
        historyAction.descr = descr;
        historyAction.result = result;
        historyAction.type = type;

        $scope.history.push(historyAction);
    };

    $scope.makeBet = function (bet) {
        if ($scope.betting.isMakeBet && $scope.addNewBetToList(bet)){
            addToHistory("Make bet", bet.type, bet.amount, "make");
        }

        if ($scope.betting.isRemoveBet){
            $scope.removeBet(bet.type);
        }
    };

    $scope.setRemovingBet = function () {
        $scope.betting.isMakeBet = false;
        $scope.betting.isRemoveBet = true;
    };

    $scope.removeBet = function (type) {
        for (var i = 0; i < $scope.bets.length; i++){
            if ($scope.bets[i].type == type){
                addToHistory("Disable bet", $scope.bets[i].type, $scope.bets[i].amount, "disable");
                $scope.bets.splice(i, 1);
                commonModule.removeBet(type);
                $scope.betting.isRemoveBet = false;

                return true;
            }
        }

        return false;
    };

    $scope.removeAll = function () {
        for (var i = 0; i < $scope.bets.length; ){
            $scope.betting.isRemoveBet = true;
            if (!$scope.removeBet($scope.bets[i].type)){
                i = 1;
            }
        }
    };

    $scope.changeAreaCoords = function () {
        commonModule.setAreaWidth($scope.betsPos, $scope.bets);
    };

    $scope.addNewBetToList = function (bet) {
        var added = false;
        for (var i = 0; i < $scope.bets.length; i++){
            if (bet.type == $scope.bets[i].type){
                if ($scope.bets[i].amount + $scope.betting.amount <= $scope.game.max){
                    $scope.bets[i].amount += $scope.betting.amount;
                    added = true;
                }
                else {
                    return false;
                }
            }
        }

        if (!added){
            var xBet = bet.coords[0] + Math.round((bet.coords[2] - bet.coords[0] - bet.width) / 2) + bet.width;
            var yBet = bet.coords[1] + Math.round((bet.coords[3] - bet.coords[1] - bet.width) / 2);

            commonModule.setBet(xBet, yBet, bet.width, bet.type);

            bet.position = {
                "x" : bet.coordsSt[0] + Math.round((bet.coordsSt[2] - bet.coordsSt[0] - bet.widthSt) / 2) + bet.widthSt,
                "y" : bet.coordsSt[1] + Math.round((bet.coordsSt[3] - bet.coordsSt[1] - bet.widthSt) / 2),
                "width" : bet.widthSt
            };

            bet.amount = $scope.betting.amount;

            $scope.bets.push(bet);
        }
        $scope.betting.isMakeBet = false;

        return true;
    };

}
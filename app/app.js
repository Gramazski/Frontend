/**
 * Created by gs on 28.02.2017.
 */
angular.module('commonApp', []);

angular.module('crapsApp', ["ngRoute", 'commonApp']).config(function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'components/home/view.html',
            controller: 'homeController'
        });
    $routeProvider.when('/login',
        {
            templateUrl: 'components/login/view.html',
            controller: 'loginController'
        });
    $routeProvider.when('/result',
        {
            templateUrl: 'components/result/view.html',
            controller: 'resultController'
        });
    $routeProvider.when('/register',
        {
            templateUrl: 'components/register/view.html',
            controller: 'registerController'
        });

    $routeProvider.otherwise({redirectTo: '/'});
}).run(function($rootScope, $location) {
    $rootScope.loggedInUser = false;
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($rootScope.loggedInUser === false) {
            // no logged user, redirect to /login
            if (!((next.templateUrl == "components/home/view.html") || (next.templateUrl == "components/login/view.html")
                    || (next.templateUrl == "components/register/view.html"))) {
                $location.path("/");
            }
        }
        else {
            if ((next.templateUrl == "components/register/view.html") || (next.templateUrl == "components/login/view.html")) {
                $location.path("/");
            }
        }
    });
});
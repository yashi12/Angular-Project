angular
.module('app1',['ngRoute','testControlModule'])
    .config(($routeProvider)=>{
        $routeProvider
            .when('/',{
                templateUrl:'views/displayCategory.html'
                // controller:"SecondController"
            })
            .when('/second-page',{
                templateUrl:'views/angularTest.html'
                // controller:"TestControl"
            })
            .otherwise({
                redirectTo:'/'
            })
    })

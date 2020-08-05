angular.module('firstModule',[])
    .config(function ($stateprovider) {
        console.log("hi");
        $stateprovider
            .state('main.firstModule',{
                url:'',
                views:{
                    'first@':{
                        templateUrl:'views/displayCategory.html'
                    },
                    'second@':{
                        templateUrl:'views/angularTest.html'
                    }
                }
            })
    })
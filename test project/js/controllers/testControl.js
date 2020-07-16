const welcome = ()=>{
    return{
        restrict: "EA",
        template: "<div>How are you  ?</div>"
    }
}

angular.module('testControlModule',[])

.controller('TestControl',function ($scope ) {
    $scope.TestObject = {};
    $scope.TestObject.firstname="yashi";
    $scope.TestObject.lastname ="agarwal";
    $scope.TestObject.number = 2;

    $scope.TimesTwo = function () {
        $scope.TestObject.number *= 2;
    }
})

.directive('yaWelcomeMsg',welcome)

.factory("Calculations",function () {
    let calculations={};
    calculations.TimesTwo =function (a) {
        return a*2;
    };
    return calculations;
});


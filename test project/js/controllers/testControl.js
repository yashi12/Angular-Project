const welcome = ()=>{
    return{
        restrict: "EA",
        template: "<div>How are you  ?</div>"
    }
}
const CallSecondController = ($scope)=>{
    $scope.firstTutorial = "This is first tutorial";
}
angular.module('testControlModule',[])

    .directive('yaWelcomeMsg',welcome)

    .factory("Calculations",()=> {
        let calculations={};
        calculations.TimesTwo =(a)=> a*2;
        calculations.PythagorasTheorem = (a,b)=> (a*a)+(b*b);
        return calculations;
    })

    .controller('TestControl',($scope ,Calculations) =>{
        $scope.TestObject = {};
        $scope.TestObject.firstname="yashi";
        $scope.TestObject.lastname ="agarwal";
        $scope.TestObject.number = 2;

        $scope.TimesTwo = ()=> {
            $scope.TestObject.number = Calculations.TimesTwo($scope.TestObject.number);
        }
        Calculations.PythagorasTheorem()
    })
    .controller('SecondController',CallSecondController)


const welcome = ()=>{
    return{
        restrict: "EA",
        template: "<div>How are you  ?</div>"
    }
}
const CallSecondController = function(){
    let vm =this;
    vm.firstTutorial = "This is first tutorial";
}
angular.module('testControlModule',[])

    .directive('yaWelcomeMsg',welcome)

    .factory("Calculations",function(){
        let calculations={};
        calculations.TimesTwo =(a)=> a*2;
        calculations.PythagorasTheorem = (a,b)=> (a*a)+(b*b);
        return calculations;
    })
    .service('tableService',function ($http) {
        let service = this,
            URLS = {
                FETCH : '../data/table.json'
            };
        service.getTable = function () {
            return $http.get(URLS.FETCH);
        };
    })
    .controller('TestControl',function(Calculations,$http){
        let testCtrl = this;

        testCtrl.TestObject = {};
        testCtrl.TestObject.minsal=0;
        testCtrl.TestObject.maxsal=10000;
        testCtrl.table =[];
        // testCtrl.getTable()
        //     .then(function (response) {
        //         testCtrl.table = response.data;
        //     })
        testCtrl.firstname="yashi";
        testCtrl.TestObject.lastname ="agarwal";
        testCtrl.TestObject.number = 2;

        testCtrl.TimesTwo = ()=> {
            testCtrl.TestObject.number = Calculations.TimesTwo(testCtrl.TestObject.number);
        }
        Calculations.PythagorasTheorem()
    })
    .controller('SecondController',CallSecondController)


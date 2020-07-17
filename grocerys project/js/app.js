const HomeController = function($scope,GroceryService){
    $scope.appTitle = "Grocery List"
    $scope.groceryItems = GroceryService.groceryItems;
    $scope.removeItem = function (entry) {
        GroceryService.RemoveItem(entry);
    }
    $scope.toggleCheckState = function (entry) {
        GroceryService.ToggleCheckState(entry);
    }
    $scope.$watch(function () {
        return GroceryService.groceryItems;
    },function (groceryItems) {
        $scope.groceryItems = groceryItems;
    })
};

const GroceryListItemController = function($scope,$routeParams,$location,GroceryService){

    // $scope.rp = "Route Params Value:"+ $routeParams.id;

    if(!$routeParams.id){
        $scope.groceryItem = {id:0,completed:false , itemName:'', date:new Date()};
    }else {
        $scope.groceryItem = _.clone(GroceryService.FindById(parseInt($routeParams.id)));
    }

    $scope.save = function (){
        GroceryService.save($scope.groceryItem);
        console.log($scope.groceryItem);
        $location.path('/');
    }
    console.log($scope.groceryItems);
};

const GroceryService = function ($http) {

    let groceryservice = {};
    groceryservice.groceryItems = [
        {"id":1,"completed":false , "itemName":"milk", "date":"Fri Jul 17 2020 23:52:49"},
        {"id":2,"completed":false , "itemName":"cookies","date":"Fri Jul 18 2020 23:52:49"},
        {"id":3,"completed":false , "itemName":"butter", "date":"Fri Jul 27 2020 23:52:49"},
        {"id":4,"completed":false , "itemName":"bread","date":"Fri Jul 17 2021 23:52:49"},
        {"id":5,"completed":false , "itemName":"cheese","date":"Fri Jul 17 2020 23:53:49"},
        {"id":6,"completed":false , "itemName":"eggs","date":"Fri Jul 07 2020 23:52:49"}
    ];

    // $http.get("/data/dataServer.json")
    //     .then(function (response) {
    //         console.log(response);
    //         groceryservice.groceryItems = response.data;
    //
    //         for(let item in groceryservice.groceryItems){
    //             groceryservice.groceryItems[item].date =new Date(groceryservice.groceryItems[item].date);
    //         }
    //     },function (reason) {
    //         alert(reason);
    //     })


    groceryservice.GetNewId = function(){
        if(groceryservice.newId){
            groceryservice.newId++;
            console.log("exist"+groceryservice.newId);
            return groceryservice.newId;
        }
        else{
            let maxItem = _.max(groceryservice.groceryItems, function (entry) {return entry.id});
            groceryservice.newId = maxItem.id+1;
            console.log("create"+groceryservice.newId);
            return groceryservice.newId;
        }
    }

    groceryservice.save = function (entry) {

        let updateItem = groceryservice.FindById(entry.id);
        if(updateItem){
            // _.extend(updateItem,entry);
            updateItem.itemName = entry.itemName;
            updateItem.date = new Date();
            updateItem.completed = true;
        }else {

            entry.id = groceryservice.GetNewId();
            groceryservice.groceryItems.push(entry);
        }
    }

    groceryservice.FindById = function (id) {
        for(item in groceryservice.groceryItems){
            if(groceryservice.groceryItems[item].id === id){
                return groceryservice.groceryItems[item];
            }
        }
    }

    groceryservice.RemoveItem = function (entry) {
        let index = groceryservice.groceryItems.indexOf(entry);
        groceryservice.groceryItems.splice(index,1);
    };

    groceryservice.ToggleCheckState = function (entry) {
        entry.completed = !entry.completed;
    };

    return groceryservice;
}

const router = function ($routeProvider) {
    console.log("app.js config launched");
    $routeProvider
        .when('/',{
            templateUrl:'view/groceryList.html',
            controller:'HomeController'
        })
        .when('/addItem',{
            templateUrl:'view/inputItem.html',
            controller:'GroceryListItemController'
        })
        .when('/addItem/edit/:id',{
            templateUrl:'view/inputItem.html',
            controller:'GroceryListItemController'
        })
        .otherwise({
            templateUrl:'https://docs.angularjs.org/api/ngRoute/directive/ngView',
            redirectTo:'/'
        });
};

const tdGroceryRowItemView =function () {
    return{
        restrict:"E",
        templateUrl:"../html/view/groceryRowItem.html"
    }
};
angular
    .module('groceryList',['ngRoute'])
    .controller("HomeController",["$scope","GroceryService",HomeController])
    .controller("GroceryListItemController",["$scope","$routeParams","$location","GroceryService",GroceryListItemController])
    .service('GroceryService',GroceryService)
    .config(router)
    .directive('tdGroceryRowItemView',tdGroceryRowItemView)
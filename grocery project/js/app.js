const HomeController = ($scope)=>{
    $scope.appTitle = "Grocery List"
};

const GroceryListItemController = ($scope)=>{
    $scope.groceryItems = [
        {completed:true , itemName:'milk', date:'2020-01-01'},
        {completed:true , itemName:'cookies', date:'2020-02-01'},
        {completed:true , itemName:'butter', date:'2020-03-01'},
        {completed:true , itemName:'bread', date:'2020-01-07'},
        {completed:true , itemName:'cheese', date:'2020-02-11'},
        {completed:true , itemName:'eggs', date:'2020-08-01'}
    ]
};

angular
    .module('groceryList',['ngRoute'])
    .controller("HomeController",HomeController)
    .controller("GroceryListItemController",GroceryListItemController)
    .config(function ($routeProvider) {
        console.log("app.js config launched");
        $routeProvider
            .when('/',{
                templateUrl:'view/groceryList.html'
                // controller:'GroceryListItemController'
            })
            .when('/addItem',{
                templateUrl:'view/inputItem.html'
                // controller:'GroceryListItemController'
            })
            .otherwise({
                templateUrl:'https://docs.angularjs.org/api/ngRoute/directive/ngView'
                // redirectTo:'/'
            });
    })
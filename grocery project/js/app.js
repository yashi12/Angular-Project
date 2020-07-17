const HomeController = ($scope)=>{
    $scope.appTitle = "Grocery List"
};

const GroceryListItemController = ($scope)=>{

    $scope.categorieItems = [
        {name:'breakfast'},
        {name:'lunch'},
        {name:'dinner'}
    ]
    $scope.groceryItems = [
        {completed:true , itemName:'milk', date:'2020-01-01',category:'breakfast'},
        {completed:true , itemName:'cookies', date:'2020-02-01',category: 'breakfast'},
        {completed:true , itemName:'butter', date:'2020-03-01',category: 'lunch'},
        {completed:true , itemName:'bread', date:'2020-01-07',category: 'dinner'},
        {completed:true , itemName:'cheese', date:'2020-02-11',category: 'lunch'},
        {completed:true , itemName:'eggs', date:'2020-08-01',category: 'dinner'}
    ]

    $scope.currentCategory = null;
    let SetCurrentCategory = (category)=>{
        $scope.currentCategory = category;

        // debug
        console.log($scope.currentCategory);
    }
    let IsCurrentCategory = (category)=>{
        return $scope.currentCategory!=null && category.name === $scope.currentCategory.name;
    }

    $scope.SetCurrentCategory = SetCurrentCategory;
    $scope.IsCurrentCategory = IsCurrentCategory;
//    ----------------------------------------------------------------
//    CREATING AND EDITING STATES
//    -----------------------------------------------------------------
    $scope.isCreating=false;
    $scope.isEditing = false;

    let StartCreating = ()=>{
        $scope.isCreating=true;
        $scope.isEditing = false;
    }
    let CancelCreating =()=>{
        $scope.isCreating=false;
    }
    let StartEditing = ()=>{
        $scope.isCreating=false;
        $scope.isEditing = true;
    }
    let CancelEditing =()=>{
        $scope.isEditing=false;
    }
    let ShoulsShowCreating=()=>{
        return $scope.currentCategory && !$scope.isEditing;
    }
    let ShoulsShowEditing=()=>{
        return !$scope.isCreating && $scope.isEditing;
    }
    $scope.StartCreating = StartCreating;
    $scope.CancelCreating = CancelCreating;
    $scope.StartEditing = StartEditing;
    $scope.CancelEditing = CancelEditing;
    $scope.ShoulsShowCreating = ShoulsShowCreating;
    $scope.ShoulsShowEditing = ShoulsShowEditing;
};

const router = ($routeProvider)=> {
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
}
angular
    .module('groceryList',['ngRoute'])
    .controller("HomeController",HomeController)
    .controller("GroceryListItemController",GroceryListItemController)
    // .config(router)
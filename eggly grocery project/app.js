// const GroceryListItemController = function ($scope) {
//
//     $scope.categorieItems=[];
//     // $scope.categorieItems = [
//     //     {name: 'breakfast'},
//     //     {name: 'lunch'},
//     //     {name: 'dinner'}
//     // ]
//     // $scope.groceryItems =[];
//
//
//     $scope.currentCategory = null;
//     let SetCurrentCategory = function (category) {
//         $scope.currentCategory = category;
//         // $state.go('eggly.categories.items',{category:category.name});
//
//         CancelCreating();
//         CancelEditing();
//
//         // debug
//         console.log($scope.currentCategory);
//     }
//     let IsCurrentCategory = function (category) {
//         return $scope.currentCategory != null && category.name === $scope.currentCategory.name;
//     }
//
//     $scope.SetCurrentCategory = SetCurrentCategory;
//     $scope.IsCurrentCategory = IsCurrentCategory;
//
//
// //    ----------------------------------------------------------------
// //    CRUD
// //    -----------------------------------------------------------------
//
//     let resetCreateForm = function () {
//         $scope.newItem = {
//             completed: true,
//             itemName: '',
//             date: '',
//             category: $scope.currentCategory.name
//         }
//     }
//     let createItem = function (newItem) {
//         let maxItem = _.max($scope.groceryItems, function (item) {
//             return item.id;
//         });
//         newItem.id = maxItem.id + 1;
//         // newItem.id = $scope.groceryItems.length+1;
//         newItem.date = new Date();
//         $scope.groceryItems.push(newItem);
//         console.log($scope.groceryItems.length);
//         resetCreateForm();
//     }
//
//     $scope.currentItem = null;
//
//     let setEditItem = function (item) {
//         $scope.currentItem = angular.copy(item);
//     }
//     let updateItem = function (currentItem) {
//         let index = _.findIndex($scope.groceryItems, function (item) {
//             return item.id == currentItem.id;
//         })
//         $scope.groceryItems[index] = currentItem;
//         $scope.isEditing = false;
//         $scope.currentItem = null;
//     }
//     let isSelecteditem = function (itemId) {
//         return $scope.currentItem != null && $scope.currentItem.id == itemId;
//     }
//     let deleteItem = function (currentItem) {
//         let index = _.findIndex($scope.groceryItems, function (item) {
//             return item.id == currentItem.id;
//         })
//         $scope.groceryItems.splice(index, 1);
//         // _.remove($scope.groceryItems, function (item) {
//         //     return item.id == currentItem.id;
//         // });
//     }
//
//
//     $scope.createItem = createItem;
//     $scope.setEditItem = setEditItem;
//     $scope.updateItem = updateItem;
//     $scope.isSelecteditem = isSelecteditem;
//     $scope.deleteItem = deleteItem;
//
//
// //    ----------------------------------------------------------------
// //    CREATING AND EDITING STATES
// //    -----------------------------------------------------------------
//     $scope.isCreating = false;
//     $scope.isEditing = false;
//
//     let StartCreating = function () {
//         $scope.isCreating = true;
//         $scope.isEditing = false;
//
//         resetCreateForm();
//     }
//     let CancelCreating = function () {
//         $scope.isCreating = false;
//     }
//     let StartEditing = function () {
//         $scope.isCreating = false;
//         $scope.isEditing = true;
//     }
//     let CancelEditing = function () {
//         $scope.isEditing = false;
//     }
//     let ShouldShowCreating = function () {
//         console.log("currentcategory  " + $scope.currentCategory);
//         console.log(!$scope.isEditing);
//         console.log($scope.currentCategory && !$scope.isEditing);
//         return $scope.currentCategory && !$scope.isEditing;
//     }
//     let ShouldShowEditing = function () {
//         return !$scope.isCreating && $scope.isEditing;
//     }
//     $scope.StartCreating = StartCreating;
//     $scope.CancelCreating = CancelCreating;
//     $scope.StartEditing = StartEditing;
//     $scope.CancelEditing = CancelEditing;
//     $scope.ShouldShowCreating = ShouldShowCreating;
//     $scope.ShouldShowEditing = ShouldShowEditing;
// };

// const router = function ($routeProvider) {
//     console.log("app.js config launched");
//     $routeProvider
//         .when('/', {
//             templateUrl: 'view/groceryList.html'
//             // controller:'GroceryListItemController'
//         })
//         .when('/addItem', {
//             templateUrl: 'view/inputItem.html'
//             // controller:'GroceryListItemController'
//         })
//         .otherwise({
//             templateUrl: 'https://docs.angularjs.org/api/ngRoute/directive/ngView'
//             // redirectTo:'/'
//         });
// }


angular
    // .module('groceryList', ['ui.router','categories'])
    .module('groceryList', ['ui.router', 'categories', 'categories.items'])
    // .controller("GroceryListItemController", GroceryListItemController)
    .config(function ($stateProvider, $urlRouterProvider) {
        console.log("app.js");
        $stateProvider
            .state('eggly', {
                url: '',
                template: '<ui-view/>',
                abstract: true
            });
        console.log("end");
        $urlRouterProvider.otherwise('');
    })

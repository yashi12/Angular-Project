angular.module('categories.items',[
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'

])
    // .config(function ($stateProvider) {
    //     $stateProvider
    //         .state('eggly.categories.items',{
    //             url:'categories/:category',
    //             views:{
    //                 'items@':{
    //                     templateUrl:'categories/items/items.tmpl.html',
    //                     controller:'ItemsCtrl'
    //                 }
    //             }
    //         });
    // })
    // .controller('ItemsCtrl',function ($scope,$stateParams) {
    //     $scope.currentCategoryName = $stateParams.category;
    // });

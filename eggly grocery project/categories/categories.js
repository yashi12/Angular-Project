const categoriesApp = angular.module('categories', ['ui.router']);
categoriesApp.config(function ($stateProvider) {
    console.log("categories.js");
    $stateProvider
        .state('eggly.categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesCtrl',
                    templateUrl: 'categories/categories.tmpl.html'
                },
                'items@': {
                    controller: 'ItemsCtrl',
                    templateUrl: 'categories/items/items.tmpl.html'
                }
            }
        })
    console.log("end categories.js");
})
categoriesApp.controller('CategoriesCtrl', function CategoriesCtrl($scope) {

});

categoriesApp.controller('ItemsCtrl', function ItemsCtrl($scope) {

});
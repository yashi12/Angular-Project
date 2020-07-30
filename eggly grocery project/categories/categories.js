angular.module('categories',
    ['ui.router', 'categories.items', 'eggly.models.categories'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories', {
                url: '/',
                views: {
                    'categories@': {
                        controller: 'CategoriesController as vm',
                        templateUrl: 'app/category/categories.tmpl.html'
                    },
                    'items@': {
                        controller: 'ItemsListCtrl as itemsListCtrl',
                        templateUrl: 'categories/items/items.tmpl.html'
                    }
                }
            })
    })
    .controller('CategoriesController', function CategoriesCtrl(CategoriesModel) {
    let vm = this;
    CategoriesModel.getCategories()
        .then(function (result) {
            vm.categorieItems = result;
        })
});

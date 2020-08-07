angular
    .module('categories')
    .config(categoriesConfig);

categoriesConfig.$inject = ['$stateProvider'];

function categoriesConfig($stateProvider) {
    $stateProvider
        .state('eggly.categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesController as vm',
                    templateUrl: '../src/category/categories.tmpl.html'
                },
                'items@': {
                    controller: 'ItemsController as vm',
                    templateUrl: '../src/items/items.tmpl.html'
                }
            }
        })
}
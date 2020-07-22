const categoriesApp = angular.module('categories',
    ['ui.router','categories.items','eggly.models.categories']);
categoriesApp.config(function ($stateProvider) {
    $stateProvider
        .state('eggly.categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesListCtrl as categoriesListCtrl',
                    templateUrl: 'categories/categories.tmpl.html'
                },
                'items@': {
                    controller: 'ItemsListCtrl as itemsListCtrl',
                    templateUrl: 'categories/items/items.tmpl.html'
                }
            }
        })
})
categoriesApp.controller('CategoriesListCtrl', function CategoriesCtrl(CategoriesModel) {
    let categoriesListCtrl =this;
    CategoriesModel.getCategories()
        .then(function (result) {
            categoriesListCtrl.categorieItems = result;
        })
});

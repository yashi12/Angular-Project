// angular
//     .module('categories')
//     .config(categoriesConfig);
// import './categories.tmpl.html';

categoriesConfig.$inject = ['$stateProvider'];

function categoriesConfig($stateProvider) {
    $stateProvider
        .state('eggly.categories', {
            url: '/',
            views: {
                'categories@': {
                    controller: 'CategoriesController as vm',
                    template: require('./categories.tmpl.html')
                },
                // 'items@': {
                //     controller: 'ItemsController as vm',
                //     template:require( '../items/items.tmpl.html')
                // }
            }
        })
}

export default categoriesConfig;
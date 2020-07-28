angular
    .module('groceryList', ['ui.router','ui.bootstrap', 'categories', 'categories.items'])
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

// angular
//         .module('app', ['ui.router','ui.bootstrap', 'categories', 'categories.items'])
//     .config(function ($stateProvider, $urlRouterProvider) {
//         console.log("app.js");
//         $stateProvider
//             .state('eggly', {
//                 url: '',
//                 template: '<ui-view/>',
//                 abstract: true
//             });
//         console.log("end");
//         $urlRouterProvider.otherwise('');
//     })
angular
    .module('app', ['ui.router','ui.bootstrap', 'categories', 'categories.items'])
    .config(appConfig)

appConfig.$inject = ['$stateProvider','$urlRouterProvider']
function appConfig($stateProvider, $urlRouterProvider) {
    console.log("app.js");
    $stateProvider
        .state('eggly', {
            url: '',
            template: '<ui-view/>',
            abstract: true
        });
    console.log("end");
    $urlRouterProvider.otherwise('');
}
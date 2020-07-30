angular
    .module('app')
    .config(appConfig);

appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

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
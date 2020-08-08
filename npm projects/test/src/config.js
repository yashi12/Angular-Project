// import appModule from './module.js';
// import '../dist/template.html';
// import {con} from "./controller.js";
//
// export let configApp = appModule
// .config(funcConfig);

funcConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function funcConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('form',{
            url:'',
            views:{
                'categories@':{
                    controller:'FormController as vm',
                    template:require('../dist/template.html'),
                }
            },
            // controller:'FormController as vm',
            // template:require('../dist/template.html'),
            // template:'<h1>hello xdfcgvhbjk</h1>',

        });
    $urlRouterProvider.otherwise('');
}
export default funcConfig;
import appModule from './module.js';
import '../dist/template.html';
import {con} from "./controller.js";

export let configApp = appModule
.config(funcConfig);

funcConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function funcConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('form',{
            url:'',
            controller:'FormController as vm',
            // template:'<h1>hello xdfcgvhbjk</h1>',
            template:require('../dist/template.html'),
        });
    $urlRouterProvider.otherwise('');
}
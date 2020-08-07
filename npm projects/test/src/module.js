import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import funConfig from './config.js';
import ctrlFunc from './controller.js';
import enrollNum from './enroll.directive.js';

import _ from 'lodash';

console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);

const appModule = angular
    .module('app', [uiRouter])
    .config(funConfig)
    .controller('FormController',ctrlFunc)
    .directive('enrollNum',enrollNum);



console.log(appModule);
export default appModule;

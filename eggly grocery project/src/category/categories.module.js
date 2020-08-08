


import angular from 'angular';
import uiRouter from "@uirouter/angularjs";

import itemsModule from '../items/items.module.js';
import './categories.tmpl.html';
import categoriesConfig from './categories.config.js';
import categoriesService from './categories.service.js';
import CategoriesController from './categories.controller.js';





// const categoryModule = angular.module('categories', ['ui.router', 'categories.items']);
// const categoryModule = angular.module('categories', [uiRouter, itemsModule])
const categoryModule = angular.module('categories', [uiRouter,'categories.items'])
    .config(categoriesConfig)
    .service('categoriesService',categoriesService)
    .controller('CategoriesController',CategoriesController);

export default categoryModule;

console.log("categoryModule");
// const itemsModule = angular.module('categories.items', [
//     'categories'
// ]);

import angular from 'angular';
import './createModal.html';
import './editModal.html';
import './items.tmpl.html';

import categoryModule from '../category/categories.module.js';
import itemsConfig from './items.config.js';
import itemsService from './items.service.js';
import ItemsController from './items.controller.js';


const itemsModule = angular.module('categories.items', ['categories'])
    .config(itemsConfig)
    .service('itemsService', itemsService)
    .controller('ItemsController', ItemsController);

export default itemsModule;

console.log("itemsModule");
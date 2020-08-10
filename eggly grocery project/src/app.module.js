console.log("appModule");
import './appAnimation.css';
import './appMainPage.css';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'ui-bootstrap4';

// import _ from 'underscore';

import categoryModule from './category/categories.module.js';
// import itemsModule from './items/items.module.js';
import appConfig from './app.config.js';

angular
    .module('app', [uiRouter,uiBootstrap,'categories'])
    .config(appConfig);

// angular
//     .module('app', [uiRouter,uiBootstrap, categoryModule,itemsModule])
//     .config(appConfig);

// console.log("appModule");

// angular
//     .module('app', ['ui.router','ui.bootstrap', 'categories', 'categories.items']);
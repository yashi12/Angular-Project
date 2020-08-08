// angular
//     .module('categories.items')
//     .config(itemsConfig);

itemsConfig.$inject = ['$stateProvider'];

function itemsConfig($stateProvider) {
    $stateProvider
        .state('eggly.categories.items', {
            url: 'categories/:category',
            views: {
                'items@': {
                    template: require('./items.tmpl.html'),
                    controller: 'ItemsController as vm'
                }
            }
        });
}

export default itemsConfig;
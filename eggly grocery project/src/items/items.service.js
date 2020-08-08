// angular.module('categories.items')
//     .service('itemsService', itemsService);

import _ from 'underscore';

itemsService.$inject = ['$http','$q'];

function itemsService($http, $q) {
    let json = require('../../data/items.json');
    let itemsService = this,
        URLS = {
            FETCH: '../../data/items.json'
        },
        groceryItems;

    itemsService.setNewItem = setNewItem;
    itemsService.getItemById = getItemById;
    itemsService.getItems = getItems;
    itemsService.updateItem = updateItem;
    itemsService.createItem = createItem;
    itemsService.deleteItem = deleteItem;

    function setNewItem(item) {
        itemsService.newItem = item;
    }

    function extract(result) {
        return result.data;
    }

    function cacheItems(result) {
        groceryItems = extract(result);
        return groceryItems;
    }

    function findItem(itemId) {
        return _.find(groceryItems, function (item) {
            return item.id == itemId;
        })
    }

    function getItemById(itemId) {
        let deferred = $q.defer();
        if (groceryItems) {
            deferred.resolve(findItem(itemId));
        } else {
            itemsService.getItems().then(function () {
                deferred.resolve(findItem(itemId));
            })
        }
        return deferred.promise;
    }

    function getItems() {
        // let deferred = $q.defer();
        // if (groceryItems) {
        //     deferred.resolve(groceryItems);
        // } else {
        //     $http.get(URLS.FETCH).then(function (groceryItems) {
        //         deferred.resolve(cacheItems(groceryItems));
        //     });
        // }
        // return deferred.promise;
        groceryItems = json;
        return groceryItems;
    }

    function updateItem(item) {
        let index = _.findIndex(groceryItems, function (curritem) {
            return curritem.id == item.id;
        });
        groceryItems[index] = item;
    }

    function createItem(item) {
        item.id = groceryItems.length + 1;
        groceryItems.push(item);
        console.log(groceryItems);
    }

    function deleteItem(item) {
        let index = _.findIndex(groceryItems, function (curritem) {
            return curritem.id == item.id;
        });
        groceryItems.splice(index, 1);
    }
}

export default itemsService;
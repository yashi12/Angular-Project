// angular.module('categories.items')
//     .service('itemsService', itemsService);

import _ from 'underscore';
// import 'http-request';

itemsService.$inject = ['$http','$q','$localStorage'];

function itemsService($http, $q,$localStorage) {
    let json = require('../../data/items.json');
    console.log("item json",json);

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

    async function getItems() {
        // let deferred = $q.defer();
        // $http.get(URLS.FETCH).then(function (groceryItems) {
        //     deferred.resolve(cacheItems(groceryItems));
        // });
        // return deferred.promise;
        if($localStorage.items){
            groceryItems = $localStorage.items;
        }
        else {
            await import('../../data/items.json')
                .then(({default: items}) => {
                    console.log("items");
                    groceryItems = items;
                })
            // groceryItems = json;
            return groceryItems;
        }
    }

    function updateItem(item) {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=6c593e7606df5c875f49e434e924aa32')
            .then(function (response) {
                return response.json();
            }).then(function (result) {
            console.log(result.main.temp);
        }).catch(function (error) {
            console.log(error);
        });
        if(!groceryItems){
            getItems();
        }
        let index = _.findIndex(groceryItems, function (curritem) {
            return curritem.id == item.id;
        });
        groceryItems[index] = item;
    }

    function createItem(item) {
        if(!groceryItems){
            getItems();
        }
        item.id = groceryItems.length + 1;
        groceryItems.push(item);
        console.log(groceryItems);
    }

    function deleteItem(item) {
        if(!groceryItems){
            getItems();
        }
        let index = _.findIndex(groceryItems, function (curritem) {
            return curritem.id == item.id;
        });
        groceryItems.splice(index, 1);
    }
}

export default itemsService;
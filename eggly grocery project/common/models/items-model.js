angular.module('eggly.models.items', [])
    .service('ItemsModel', function ($http, $q) {
        let model = this,
            URLS = {
                FETCH: 'data/items.json'
            },
            groceryItems;

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

        model.getItemById = function (itemId) {
            let deferred = $q.defer();
            if (groceryItems) {
                deferred.resolve(findItem(itemId));
            } else {
                model.getItems().then(function () {
                    deferred.resolve(findItem(itemId));
                })
            }
            return deferred.promise;
        }
        model.getItems = function () {
            let deferred = $q.defer();
            if (groceryItems) {
                deferred.resolve(groceryItems);
            } else {
                $http.get(URLS.FETCH).then(function (groceryItems) {
                    deferred.resolve(cacheItems(groceryItems));
                });
            }
            return deferred.promise;

        }
        model.updateItem = function (item) {
            let index = _.findIndex(groceryItems, function (curritem) {
                return curritem.id == item.id;
            });
            groceryItems[index] = item;
        };
        model.createItem = function (item) {
            item.id = groceryItems.length + 1;
            groceryItems.push(item);
            console.log(groceryItems.length);
        }
        model.deleteItem = function (item) {
            let index = _.findIndex(groceryItems, function (curritem) {
                return curritem.id == item.id;
            });
            groceryItems.splice(index, 1);
            // _.remove(groceryItems,function (curritem) {
            //     return curritem.id == item.id;
            // })
        }
    })
;
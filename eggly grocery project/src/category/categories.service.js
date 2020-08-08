// angular
//     .module('categories')
//     .service('categoriesService', categoriesService);
import _ from 'underscore';
categoriesService.$inject = ['$http', '$q'];

function categoriesService($http, $q) {
    const json1 = require('../../data/items.json');
    const json = require('../../data/categories.json');
    console.log("json",json);
    console.log("json1",json1);
    let categoriesService = this,
        URLS = {
            FETCH: '../../data/categories.json'
        },
        categorieItems,
        currentCategory;

    categoriesService.getCategories = getCategories;
    categoriesService.getCategoryByName = getCategoryByName;
    categoriesService.SetCurrentCategory = SetCurrentCategory;
    categoriesService.getCurrentCategory = getCurrentCategory;
    categoriesService.getCurrentCategoryName = getCurrentCategoryName;

    function extract(result) {
        return result.data;
    }

    function cacheCategories(result) {
        categorieItems = extract(result);
        return categorieItems;
    }

    function getCategories() {
        // return (categorieItems) ? $q.when(categorieItems) : $http.get(URLS.FETCH).then(cacheCategories);
        categorieItems = json;
        console.log("categorie items",categorieItems);
        return categorieItems;
    }

    function getCategoryByName(categoryName) {
        let deferred = $q.defer();

        function findCategory() {
            return _.find(categorieItems, function (c) {
                return c.name == categoryName
            })
        }

        if (categorieItems) {
            deferred.resolve(findCategory());
            console.log(findCategory());
        } else {
            categoriesService.getCategories()
                .then(function () {
                    deferred.resolve(findCategory());
                })
        }
        return deferred.promise;
    }

    function SetCurrentCategory(categoryName) {
        return categoriesService.getCategoryByName(categoryName)
            .then(function (category) {
                console.log("category");
                console.log(category);
                currentCategory = category;
            })
    }

    function getCurrentCategory() {
        return currentCategory;
    }

    function getCurrentCategoryName() {
        return currentCategory ? currentCategory.name : '';
    }
}

export default categoriesService;
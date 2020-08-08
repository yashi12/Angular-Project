const http = require('http');

categoriesService.$inject = ['$http', '$q'];

function categoriesService($http, $q) {
    const json = require('../data/categories.json');
    console.log("json",json);
    let categoriesService = this,
        URLS = {
            FETCH: '../data/categories.json'
        },
        categorieItems,
        currentCategory;
    console.log("urls",URLS.FETCH);

    categoriesService.getCategories = getCategories;
    categoriesService.getCategoryByName = getCategoryByName;
    categoriesService.SetCurrentCategory = SetCurrentCategory;
    categoriesService.getCurrentCategory = getCurrentCategory;
    categoriesService.getCurrentCategoryName = getCurrentCategoryName;
    categoriesService.show = show;

    function show() {
        console.log("data service");
    }

    function extract(result) {
        return result.data;
    }

    function cacheCategories(result) {
        categorieItems = extract(result);
        return categorieItems;
    }

    function getCategories() {
        console.log("getcategory");
        // let result =  (categorieItems) ? $q.when(categorieItems) :fetch.fetchUrl(URLS.FETCH,(res)=>{
        //     cacheCategories(res)
        // });
        categorieItems = json;
        // let result =  (categorieItems) ? $q.when(categorieItems) : json;
        // console.log("result",result);
        return categorieItems;
    }

    function getCategoryByName(categoryName) {
        let deferred = $q.defer();

        function findCategory() {
            return _.find(categorieItems, function (c) {
                return c.name = categoryName
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
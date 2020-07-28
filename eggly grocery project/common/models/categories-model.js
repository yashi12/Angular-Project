angular.module('eggly.models.categories', [])
    .service('CategoriesModel', function ($http, $q) {
        let model = this,
            URLS = {
                FETCH: 'data/categories.json'
            },
            categorieItems,
            currentCategory;

        function extract(result) {
            return result.data;
        }

        function cacheCategories(result) {
            categorieItems = extract(result);
            return categorieItems;
        }

        model.getCategories = function() {
            return (categorieItems)? $q.when(categorieItems) : $http.get(URLS.FETCH).then(cacheCategories);
        }

        model.getCategoryByName = function (categoryName) {
            let deferred = $q.defer();
            
            function findCategory() {
                return _.find(categorieItems, function (c) {
                    return c.name = categoryName
                })
            }
            if(categorieItems){
                deferred.resolve(findCategory());
                console.log(findCategory());
            }
            else {
                model.getCategories()
                    .then(function () {
                        deferred.resolve(findCategory());
                    })
            }
            return deferred.promise;
        }

        model.SetCurrentCategory = function (categoryName) {
            return model.getCategoryByName(categoryName)
                .then(function (category) {
                    console.log("category");
                    console.log(category);
                    currentCategory = category;
                })
        }

        model.getCurrentCategory = function () {
            return currentCategory;
        }

        model.getCurrentCategoryName = function () {
            return currentCategory? currentCategory.name : '';
        }


    })
;
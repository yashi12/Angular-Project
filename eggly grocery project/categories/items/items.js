angular.module('categories.items',[
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.items',{
                url:'categories/:category',
                views:{
                    'items@':{
                        templateUrl:'categories/items/items.tmpl.html',
                        controller:'ItemsListCtrl as itemsListCtrl'
                    }
                }
            });
    })
    .controller('ItemsListCtrl',function ($stateParams,ItemsModel,CategoriesModel) {
        let itemsListCtrl= this;

        CategoriesModel.SetCurrentCategory($stateParams.category);

        itemsListCtrl.currentCategoryName = $stateParams.category;
        ItemsModel.getItems()
            .then(function (items) {
                itemsListCtrl.groceryItems =items;
            });
        itemsListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        itemsListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
        itemsListCtrl.deleteItem = ItemsModel.deleteItem;
    });

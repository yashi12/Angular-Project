angular.module('categories.items.create', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.items.create',{
                url:'/items/create',
                templateUrl:'categories/items/create/items-create-tmpl.html',
                controller:'CreateItemCtrl as createItemCtrl'
            })
    })
    .controller('CreateItemCtrl' ,function ($state,$stateParams,ItemsModel) {
        let createItemCtrl=this;
        
        function returnToItems() {
            $state.go('eggly.categories.items',{
                category:$stateParams.category
            })
        }
        function CancelCreating() {
            return returnToItems();
        }
        function createItem(item) {
            ItemsModel.createItem(item);
            returnToItems();
        }
        function resetForm() {
            createItemCtrl.newItem = {
                completed: true,
                itemName: '',
                date: '',
                category: $stateParams.category
            }
        }
        createItemCtrl.CancelCreating = CancelCreating;
        createItemCtrl.createItem = createItem;
        resetForm();
    })

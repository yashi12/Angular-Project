angular.module('categories.items.edit', [])
    .config(function ($stateProvider) {
        console.log("edit");
        $stateProvider
            .state('eggly.categories.items.edit', {
                url: '/items/edit/:id',
                templateUrl: 'categories/items/edit/items-edit-tmpl.html',
                controller: 'EditItemCtrl as editItemCtrl'
            })
    })
    .controller('EditItemCtrl', function ($state, $stateParams, ItemsModel) {
        // console.log("stateParams");
        // console.log($stateParams);
        let editItemCtrl = this;

        function returnToItems() {
            $state.go('eggly.categories.items', {
                category: $stateParams.category
            })
        }

        function CancelEditing() {
            return returnToItems();
        }

        function updateItem() {
            editItemCtrl.item = angular.copy(editItemCtrl.editedItem);
            ItemsModel.updateItem(editItemCtrl.item);
            returnToItems();
        }

        ItemsModel.getItemById($stateParams.id)
            .then(function (item) {
                if (item) {
                    editItemCtrl.item = item;
                    editItemCtrl.editedItem = angular.copy(editItemCtrl.item);
                } else {
                    returnToItems();
                }
            })
        editItemCtrl.CancelEditing = CancelEditing;
        editItemCtrl.updateItem = updateItem;
    })

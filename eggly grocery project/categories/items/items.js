var categories_items = angular.module('categories.items', [
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'

]);
categories_items.config(function ($stateProvider) {
    $stateProvider
        .state('eggly.categories.items', {
            url: 'categories/:category',
            views: {
                'items@': {
                    templateUrl: 'categories/items/items.tmpl.html',
                    controller: 'ItemsListCtrl as itemsListCtrl'
                }
            }
        });
})
    .controller('ItemsListCtrl', ['$stateParams', 'ItemsModel', 'CategoriesModel', '$uibModal',
        function ($stateParams, ItemsModel, CategoriesModel, $uibModal) {
            let itemsListCtrl = this;

            CategoriesModel.SetCurrentCategory($stateParams.category);

            itemsListCtrl.currentCategoryName = $stateParams.category;
            ItemsModel.getItems()
                .then(function (items) {
                    itemsListCtrl.groceryItems = items;
                });
            itemsListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
            itemsListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
            itemsListCtrl.deleteItem = ItemsModel.deleteItem;

            itemsListCtrl.showDetails = function () {
            }
            itemsListCtrl.updateItem = function (message) {
                console.log("update");
                alert("update");
                // itemsListCtrl.changedItem = angular.copy(editPersonDialog.item);
                // ItemsModel.updateItem(itemsListCtrl.changedItem);
                // returnToItems();
            }

            // editing part
            itemsListCtrl.open = function (item) {
                ItemsModel.setNewItem(item);
                let modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'categories/items/edit-person-dialog.html',
                    controller: 'ModalInstanceEditCtrl',
                    controllerAs: 'modalInstanceEditCtrl'
                });
                modalInstance.result.then(function (newItemName) {
                    console.log("updated item");
                    ItemsModel.newItem.date = new Date();
                    ItemsModel.newItem.itemName = newItemName;
                    ItemsModel.updateItem(ItemsModel.newItem);
                }).catch(function (reason) {
                    console.log(reason);
                });
            }

            // creating item
            itemsListCtrl.open = function () {
                console.log("create");
                ItemsModel.newItem = {
                    completed: true,
                    itemName: "",
                    date: new Date(),
                    category: $stateParams.category
                }
                let modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'categories/items/create/model-create-tmpl.html',
                    controller: 'ModalInstanceEditCtrl',
                    controllerAs: 'modalInstanceEditCtrl'

                });
                console.log(modalInstance);
                modalInstance.result.then(function (newItemName) {
                    ItemsModel.newItem.itemName = newItemName;
                    ItemsModel.createItem(ItemsModel.newItem);
                    console.log("saved item");
                }).catch(function (reason) {
                    console.log(reason);
                });

            }


        }])
    .controller('ModalInstanceEditCtrl', ['$uibModalInstance', 'ItemsModel',
        function ($uibModalInstance, ItemsModel) {
            let modalInstanceEditCtrl = this;
            console.log("ModalInstanceEditCtrl");
            modalInstanceEditCtrl.data = ItemsModel.newItem.itemName;
            modalInstanceEditCtrl.save = function () {
                console.log(modalInstanceEditCtrl.data);
                $uibModalInstance.close(modalInstanceEditCtrl.data);
            }

            modalInstanceEditCtrl.cancel = function () {
                $uibModalInstance.dismiss('dismissed');
            }
        }])

function showDetails() {
    console.log("func")
    $('#exampleModalCenter').on('show.bs.modal', function (event) {
        console.log("button");
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('what');
        var modal = $(this)
        modal.find('.modal-title').text('Item chosen: ' + recipient.itemName)
        modal.find('.modal-body').text('Category: ' + recipient.category + "\n" + 'Date: ' + recipient.date)
    })
}

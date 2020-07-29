let EditPersonDialogModel = function () {
    this.visible = false;
};
EditPersonDialogModel.prototype.open = function (item) {
    console.log(this);
    this.item = angular.copy(item);
    this.visible = true;
};
EditPersonDialogModel.prototype.close = function () {
    this.visible = false;
};
var app = angular.module('categories.items', [
    'eggly.models.categories',
    'eggly.models.items',
    'categories.items.create',
    'categories.items.edit'

]);
app.config(function ($stateProvider) {
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
        // console.log(" start edit dialog");
        // itemsListCtrl.editDialog = new EditPersonDialogModel();
        // console.log("edit dialog");

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
                animation: itemsListCtrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'categories/items/edit-person-dialog.html',
                controller: 'ModalInstanceEditCtrl',
                controllerAs: 'modalInstanceEditCtrl'
            });
            modalInstance.result.then(function (newItemName) {
                console.log("updated item");
                ItemsModel.newItem.itemName = newItemName;
                ItemsModel.updateItem(ItemsModel.newItem);
            }).catch(function (reason) {
                console.log(reason);
            });

        }

    }])
    .controller('ModalInstanceEditCtrl',['$uibModalInstance','ItemsModel',
        function ($uibModalInstance,ItemsModel) {
            let modalInstanceEditCtrl = this;
            console.log("ModalInstanceEditCtrl");
            modalInstanceEditCtrl.data =ItemsModel.newItem.itemName ;
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

// app.directive('editPersonDialog', function () {
//     return {
//         restrict: 'E',
//         transclude:true,
//         scope: {
//             model: '=',
//             someCtrlFn: '&updateItemMethod'
//         },
//         controller:function ($scope) {
//             $scope.customItem= angular.copy($scope.model);
//         },
//         link: function (scope, element, attributes) {
//             console.log("ele", element);
//             scope.$watch('model.visible', function (newValue) {
//                 console.log('model.visible', newValue);
//                 var modalElement = element.find('.modal');
//                 console.log("modal element", modalElement);
//                 modalElement.modal(newValue ? 'show' : 'hide');
//             });
//             element.on('shown.bs.modal', function () {
//                 console.log("shown");
//                 scope.$apply(function () {
//                     scope.model.visible = true;
//                 });
//             });
//             element.on('hidden.bs.modal', function () {
//                 console.log("hidden");
//                 scope.$apply(function () {
//                     scope.model.visible = false;
//                 });
//             });
//             // scope.someCtrlFn();
//
//             // $('#save').on('click', function () {
//             //     console.log("saved", scope.model.item);
//             //     // scope.someCtrlFn();
//             //     // console.log(itemsListCtrl.editDialog);
//             //     // itemsListCtrl.updateItem();
//             //     //    console.log(ItemsModel.groceryItems);
//             //     //    ItemsModel.updateItem(item);
//             // })
//
//         },
//         templateUrl: 'categories/items/edit-person-dialog.html',
//     };
// });
//

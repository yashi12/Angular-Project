angular.module('categories.items.edit', ['ui.bootstrap'])
    .config(function ($stateProvider) {
        console.log("edit");
        $stateProvider
            .state('eggly.categories.items.edit', {
                url: '/items/edit/:itemName?category?id',
                params:{
                  id:null,
                  category: null,
                  itemName: null
                },
                // templateUrl: 'app/items/editModal.html',
                controller: 'EditItemCtrl as editItemCtrl'
            })
    })
    .controller('EditItemCtrl', ['$state','$stateParams','ItemsModel','$uibModal',
        function ($state, $stateParams, ItemsModel,$uibModal) {
        console.log("stateParams");
        console.log($stateParams);
        let editItemCtrl = this;
        editItemCtrl.open = function (item) {
            // item ={
            //     id:$stateParams.id,
            //     category: $stateParams.category,
            //     itemName:$stateParams.itemName,
            //     date:new Date(),
            //     completed: false
            // }
            ItemsModel.setNewItem(item);
            let modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/items/editModal.html',
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
        // console.log("start");
        //     editItemCtrl.open();
        // console.log("finish");
        // function returnToItems() {
        //     $state.go('eggly.categories.items', {
        //         category: $stateParams.category
        //     })
        // }
        //
        // function CancelEditing() {
        //     return returnToItems();
        // }
        //
        // function updateItem() {
        //     editItemCtrl.item = angular.copy(editItemCtrl.editedItem);
        //     ItemsModel.updateItem(editItemCtrl.item);
        //     returnToItems();
        // }
        //
        // ItemsModel.getItemById($stateParams.id)
        //     .then(function (item) {
        //         if (item) {
        //             editItemCtrl.item = item;
        //             editItemCtrl.editedItem = angular.copy(editItemCtrl.item);
        //         } else {
        //             returnToItems();
        //         }
        //     })
        // editItemCtrl.CancelEditing = CancelEditing;
        // editItemCtrl.updateItem = updateItem;
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


// angular
//     .module('categories.items')
//     .controller('ItemsController', ItemsController);

import ModalInstanceController from './modalInstance.controller.js';
import uiBootstrap from 'ui-bootstrap4';

ItemsController.$inject = ['$stateParams', 'itemsService', 'categoriesService', '$uibModal','$localStorage'];

function ItemsController($stateParams, itemsService, categoriesService, $uibModal,$localStorage) {
    let vm = this;

    vm.currentCategoryName = $stateParams.category;
    vm.getCurrentCategory = categoriesService.getCurrentCategory;
    vm.getCurrentCategoryName = categoriesService.getCurrentCategoryName;
    vm.deleteItem = itemsService.deleteItem;
    vm.openEdit = openEdit;
    vm.openCreate = openCreate;

    categoriesService.SetCurrentCategory($stateParams.category);

    activate();

    function activate() {
        if ($localStorage.items) {
            vm.groceryItems = $localStorage.items;
            $localStorage.items = vm.groceryItems;
            console.log("local",$localStorage.items);
            alert("2 Time Call");
        }
        else {
            console.log("items service", itemsService.getItems());
            return itemsService.getItems()
                .then(function (items) {
                    vm.groceryItems = items;
                    $localStorage.items = vm.groceryItems;
                    alert("1");
                }).catch(function (reason) {
                    alert(reason);
                    console.log(reason);
                });
        }
        // vm.groceryItems = itemsService.getItems();
    }

    function openEdit(item) {
        console.log("openEdit");
        itemsService.setNewItem(item);
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template: require('./editModal.html'),
            controller: 'ModalInstanceController',
            controllerAs: 'vm'
        });
        modalInstance.result.then(function (newItemName) {
            console.log("updated item");
            itemsService.newItem.date = new Date();
            itemsService.newItem.itemName = newItemName;
            itemsService.updateItem(itemsService.newItem);
        }).catch(function (reason) {
            console.log(reason);
        });
    }

    function openCreate() {
        console.log("create");
        itemsService.newItem = {
            completed: true,
            itemName: "",
            date: new Date(),
            category: $stateParams.category
        }
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            template:require( './createModal.html'),
            controller: 'ModalInstanceController',
            controllerAs: 'vm'

        });
        console.log(modalInstance);
        modalInstance.result.then(function (newItemName) {
            itemsService.newItem.itemName = newItemName;
            itemsService.createItem(itemsService.newItem);
            console.log("saved item");
        }).catch(function (reason) {
            console.log(reason);
        });

    }

}

export default ItemsController;


// function showDetails() {
//     console.log("func")
//     $('#exampleModalCenter').on('show.bs.modal', function (event) {
//         console.log("button");
//         var button = $(event.relatedTarget) // Button that triggered the modal
//         var recipient = button.data('what');
//         var modal = $(this)
//         modal.find('.modal-title').text('Item chosen: ' + recipient.itemName)
//         modal.find('.modal-body').text('Category: ' + recipient.category + "\n" + 'Date: ' + recipient.date)
//     })
// }
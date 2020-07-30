angular
    .module('categories.items')
    .controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams', 'itemsService', 'categoriesService', '$uibModal'];

function ItemsController($stateParams, ItemsModel, CategoriesModel, $uibModal) {
    let vm = this;

    vm.currentCategoryName = $stateParams.category;
    vm.getCurrentCategory = CategoriesModel.getCurrentCategory;
    vm.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
    vm.deleteItem = ItemsModel.deleteItem;
    vm.openEdit = openEdit;
    vm.openCreate = openCreate;

    CategoriesModel.SetCurrentCategory($stateParams.category);

    activate();

    function activate() {
        return ItemsModel.getItems()
            .then(function (items) {
                vm.groceryItems = items;
            }).catch(function (reason) {
                alert(reason);
                console.log(reason);
            });
    }

    function openEdit(item) {
        ItemsModel.setNewItem(item);
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/items/editModal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'vm'
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

    function openCreate() {
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
            templateUrl: 'app/items/createModal.html',
            controller: 'ModalInstanceController',
            controllerAs: 'vm'

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

}
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
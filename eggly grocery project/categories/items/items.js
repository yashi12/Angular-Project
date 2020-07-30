angular.module('categories.items', [
    'eggly.models.categories',
    'eggly.models.items',
    // 'categories.items.create',
    // 'categories.items.edit'

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('eggly.categories.items', {
                url: 'categories/:category',
                views: {
                    'items@': {
                        templateUrl: 'categories/items/items.tmpl.html',
                        controller: 'ItemsController as vm'
                    }
                }
            });
    })
    .controller('ItemsController', ['$stateParams', 'ItemsModel', 'CategoriesModel', '$uibModal',
        function ($stateParams, ItemsModel, CategoriesModel, $uibModal) {

            let vm = this;

            vm.currentCategoryName = $stateParams.category;
            vm.getCurrentCategory = CategoriesModel.getCurrentCategory;
            vm.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
            vm.deleteItem = ItemsModel.deleteItem;
            vm.openEdit = openEdit;
            vm.openCreate = openCreate;
            console.log("good");

            CategoriesModel.SetCurrentCategory($stateParams.category);

            activate();

            function activate(){
                return ItemsModel.getItems()
                    .then(function (items) {
                        vm.groceryItems = items;
                    }).catch(function (reason) {
                        alert(reason);
                        console.log(reason);
                    });
            }
            // ItemsModel.getItems()
            //     .then(function (items) {
            //         vm.groceryItems = items;
            //     }).catch(function (reason) {
            //         alert(reason);
            //         console.log(reason);
            //     });


            // vm.showDetails = function () {
            // }
            // vm.updateItem = function (message) {
            //     console.log("update");
            //     alert("update");
            //     // vm.changedItem = angular.copy(editPersonDialog.item);
            //     // ItemsModel.updateItem(vm.changedItem);
            //     // returnToItems();
            // }

            // editing part
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

            // creating item
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
                    templateUrl: 'categories/items/create/model-create-tmpl.html',
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


        }])
    .controller('ModalInstanceController', ['$uibModalInstance', 'ItemsModel',
        function ($uibModalInstance, ItemsModel) {
            let vm = this;
            console.log("ModalInstanceEditCtrl");
            vm.data = ItemsModel.newItem.itemName;
            vm.save = function () {
                console.log(vm.data);
                $uibModalInstance.close(vm.data);
            }

            vm.cancel = function () {
                $uibModalInstance.dismiss('dismissed');
            }
        }])

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

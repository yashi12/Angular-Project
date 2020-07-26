angular.module('categories.items.create', ['ui.bootstrap'])
    .config(function ($stateProvider) {
        console.log("modal state");
        $stateProvider

            .state('eggly.categories.items.create', {
                url: '/items/create',
                templateUrl: 'categories/items/create/items-create-tmpl.html',
                controller: 'CreateItemCtrl as createItemCtrl'
            })
    })
    .controller('CreateItemCtrl', ['$state', '$stateParams', 'ItemsModel', '$uibModal','$rootScope', function ($state, $stateParams, ItemsModel, $uibModal,$rootScope) {
        let createItemCtrl = this;
        createItemCtrl.data = "random data";

        createItemCtrl.open = function () {
            console.log("create");
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'categories/items/create/model-create-tmpl.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'pc'

            });
            console.log(modalInstance);
            modalInstance.result.then(function () {
                console.log("saved item");
            }).catch(function (reason) {
                console.log(reason);
            });
        };


        function returnToItems() {
            // $state.go(ModalService.getPreviousState(),{category:$stateParams.category});
            $state.go('eggly.categories.items', {
                category: $stateParams.category
            })
            // createItemCtrl.$apply();
        }

        function CancelCreating() {
            console.log("cancel creating");
            // createItemCtrl.$apply();
            return returnToItems();
        }

        function createItem(item) {
            console.log("ko");
            ItemsModel.createItem(item);
            returnToItems();
        }

        function resetForm() {
            createItemCtrl.newItem = {
                completed: true,
                itemName: '',
                date: new Date(),
                category: $stateParams.category
            }
        }

        createItemCtrl.CancelCreating = CancelCreating;
        createItemCtrl.createItem = createItem;
        resetForm();

        $rootScope.$on("parent", function(event,data){
            console.log("save");
            createItemCtrl.newItem.itemName = data;
            createItem(createItemCtrl.newItem);
            console.log("update",data);
        });

    }]);
angular.module('categories.items.create').controller('ModalInstanceCtrl',['$uibModalInstance','$rootScope', function ($uibModalInstance,$rootScope) {
    var pc = this;
    pc.data="";
    console.log("modal instace pc");
    pc.ok = function () {
        console.log("ok");
        console.log(pc.data);
        $rootScope.$emit("parent", pc.data);
        $uibModalInstance.close();
    };

    pc.cancel = function () {
       console.log("cancel");
        // alert("You clicked the cancel button.");
        $uibModalInstance.dismiss('dismissed');
    };
}]);

// .controller('CreateItemCtrlUiModal',  ['$uibModalInstance','$stateParams','data',function ($uibModalInstance, $stateParams,data) {
//     let createItemCtrlUiModal = this;
//     createItemCtrlUiModal.data = data;
//     function returnToItems() {
//         // $state.go(ModalService.getPreviousState(),{category:$stateParams.category});
//         $state.go('eggly.categories.items', {
//             category: $stateParams.category
//         })
//         // createItemCtrl.$apply();
//     }
//
//     function CancelCreating() {
//         console.log("cancel creating");
//         // createItemCtrl.$apply();
//         return returnToItems();
//     }
//
//     function createItem(item) {
//         ItemsModel.createItem(item);
//         returnToItems();
//     }
//
//     function resetForm() {
//         createItemCtrlUiModal.newItem = {
//             completed: true,
//             itemName: '',
//             date: '',
//             category: $stateParams.category
//         }
//     }
//
//     createItemCtrlUiModal.CancelCreating = CancelCreating;
//     createItemCtrlUiModal.createItem = createItem;
//     resetForm();
//
//     createItemCtrlUiModal.save = function () {
//         createItem(data);
//         alert("You clicked the ok button.");
//         $uibModalInstance.close();
//     };
//     createItemCtrlUiModal.cancel = function () {
//         CancelCreating();
//         alert("You clicked the cancel button.");
//         $uibModalInstance.dismiss('cancel');
//     };
// }])


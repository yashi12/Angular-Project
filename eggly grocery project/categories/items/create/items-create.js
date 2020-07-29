angular.module('categories.items.create', ['ui.bootstrap'])
    .controller('CreateItemCtrl', ['$state', '$stateParams', 'ItemsModel', '$uibModal', '$rootScope',
        function ($state, $stateParams, ItemsModel, $uibModal, $rootScope) {
        let createItemCtrl = this;
        createItemCtrl.open = function () {
            console.log("create");
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'categories/items/create/model-create-tmpl.html',
                controller: 'ModalInstanceCreateCtrl',
                controllerAs: 'modalInstanceCreateCtrl'

            });
            console.log(modalInstance);
            modalInstance.result.then(function (itemName) {
                createItem(itemName);
                console.log("saved item");
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        function createItem(itemName) {
            console.log("ko");
            ItemsModel.createItem({
                completed: true,
                itemName:itemName,
                date: new Date(),
                category: $stateParams.category
            });
        }


    }]);
angular.module('categories.items.create').controller('ModalInstanceCreateCtrl',
    ['$uibModalInstance', function ($uibModalInstance) {
    var modalInstanceCreateCtrl = this;
    modalInstanceCreateCtrl.data = undefined;
    modalInstanceCreateCtrl.save = function () {
        console.log(modalInstanceCreateCtrl.data);
        $uibModalInstance.close(modalInstanceCreateCtrl.data);
    };

    modalInstanceCreateCtrl.cancel = function () {
        console.log("cancel");
        $uibModalInstance.dismiss('dismissed');
    };
}]);

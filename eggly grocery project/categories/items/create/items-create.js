angular.module('categories.items.create', ['ui.bootstrap'])
    .controller('CreateItemCtrl', ['$state', '$stateParams', 'ItemsModel', '$uibModal', '$rootScope', function ($state, $stateParams, ItemsModel, $uibModal, $rootScope) {
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
            modalInstance.result.then(function () {
                createItem(createItemCtrl.newItemCreated);
                console.log("saved item");
            }).catch(function (reason) {
                console.log(reason);
            });
        };

        function createItem(item) {
            console.log("ko");
            ItemsModel.createItem(item);
        }

        $rootScope.$on("parent", function (event, data) {
            console.log("save");
            console.log("state params", $stateParams);
            createItemCtrl.newItemCreated = {
                completed: true,
                itemName: data,
                date: new Date(),
                category: $stateParams.category
            }
            console.log("update", data);
        });

    }]);
angular.module('categories.items.create').controller('ModalInstanceCreateCtrl', ['$uibModalInstance', '$rootScope', function ($uibModalInstance, $rootScope) {
    var modalInstanceCreateCtrl = this;
    modalInstanceCreateCtrl.data = "";
    console.log("modal instace pc");
    modalInstanceCreateCtrl.ok = function () {
        console.log("ok");
        $uibModalInstance.close();
    };
    modalInstanceCreateCtrl.save = function () {
        console.log(modalInstanceCreateCtrl.data);
        $rootScope.$emit("parent", modalInstanceCreateCtrl.data);
    };

    modalInstanceCreateCtrl.cancel = function () {
        console.log("cancel");
        $uibModalInstance.dismiss('dismissed');
    };
}]);

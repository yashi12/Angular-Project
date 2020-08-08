// angular
//     .module('categories.items')
//     .controller('ModalInstanceController', ModalInstanceController);

import uiBootstrap from 'ui-bootstrap4';
ModalInstanceController.$inject = ['$uibModalInstance', 'itemsService'];

function ModalInstanceController($uibModalInstance, ItemsModel) {
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
}

export default ModalInstanceController;

console.log("ModalInstanceController");
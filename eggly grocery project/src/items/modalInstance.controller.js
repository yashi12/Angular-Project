// angular
//     .module('categories.items')
//     .controller('ModalInstanceController', ModalInstanceController);

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
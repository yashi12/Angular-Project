// angular
//     .module('categories')
//     .controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['categoriesService'];

function CategoriesController(categoriesService) {
    console.log(" category controller func");
    let vm = this;

    vm.categorieItems=categoriesService.getCategories();
    console.log("vm",vm.categorieItems);
    // categoriesService.getCategories()
    //     .then(function (result) {
    //         vm.categorieItems = result;
    //     })
}

export default CategoriesController;

console.log("category controller");
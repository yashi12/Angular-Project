angular
    .module('categories')
    .controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['categoriesService'];

function CategoriesController(CategoriesModel) {
    let vm = this;
    CategoriesModel.getCategories()
        .then(function (result) {
            vm.categorieItems = result;
        })
}